import React, { useEffect, useState } from 'react'
import { AlertTitle, Typography } from '@mui/material'
import {
  INotification,
  INotificationTypeEnum,
  NotificationsService,
  NotificationType
} from './services/notifications/notifications.service'
import { AlertStyled, GroupCountStyled, NotificationsStyled } from './notifications.style'

interface INotificationProps {
  group?: boolean
  showCount?: boolean
  defaultTimeout?: number
}

export const Notifications: React.FC<INotificationProps> = ({
  group = false,
  showCount = true,
  defaultTimeout = 5000
}) => {
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [notificationsList, setNotificationsList] = useState<INotification[][]>([])

  const removeNotificationFactory =
    (list: INotification[]) => (event?: React.SyntheticEvent<Element, Event>) => {
      event?.stopPropagation()
      const ids = list.map(({ id }) => id)
      setNotifications((prev) => prev.filter(({ id }) => !ids.includes(id)))
    }

  const footprint = ({ type, title, message, timeout }: INotification): string =>
    [type, title, message, timeout].join('')

  useEffect(() => {
    const groupNotifications = (list: INotification[]): INotification[][] => {
      const footprint = ({ type, title, message, timeout }: INotification): string =>
        [type, title, message, timeout].join('')
      const notificationsSet = new Map<string, INotification[]>()

      list.forEach((item) => {
        const key = footprint(item)
        const existed = notificationsSet.get(key) || []
        notificationsSet.set(key, [...existed, item])
      })

      return Array.from(notificationsSet.values())
    }
    setNotificationsList(
      group ? groupNotifications(notifications) : notifications.map((input) => [input])
    )
  }, [group, notifications])

  useEffect(() => {
    const fadeOut = (item: INotification, timeout: number) => {
      if (timeout === 0) {
        return
      }

      setTimeout(removeNotificationFactory([item]), timeout)
    }
    const onNotification = (notification: INotification) => {
      const { type, timeout } = notification
      let timeoutToSet = 0

      switch (type) {
        case INotificationTypeEnum.ClearAll:
          setNotifications([])

          return
        case INotificationTypeEnum.Success:
        case INotificationTypeEnum.Info:
        case INotificationTypeEnum.Warning:
          timeoutToSet = defaultTimeout
          break
      }

      fadeOut(notification, typeof timeout === 'number' ? timeout : timeoutToSet)
      setNotifications((prev) => [...prev, notification])
    }

    const subscription = NotificationsService.notifications.subscribe(onNotification)

    return () => {
      subscription.unsubscribe()
    }
  }, [defaultTimeout])

  return (
    <NotificationsStyled spacing={2}>
      {notificationsList.map((items) => {
        const { type, title, message, onClick } = items[0] || {}
        const count = items.length

        return (
          <AlertStyled
            key={footprint(items[0])}
            elevation={6}
            variant="filled"
            severity={type as NotificationType}
            onClick={onClick}
            onClose={removeNotificationFactory(items)}
          >
            {showCount && count > 1 && (
              <GroupCountStyled>
                <Typography variant="caption">{count}</Typography>
              </GroupCountStyled>
            )}
            <AlertTitle>{title}</AlertTitle>
            {message}
          </AlertStyled>
        )
      })}
    </NotificationsStyled>
  )
}
