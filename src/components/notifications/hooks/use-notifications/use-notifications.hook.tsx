import { useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import {
  INotification,
  INotificationTypeEnum,
  NotificationsService,
  NotificationType
} from '../../services/notifications/notifications.service'

type MessageOrConfig = string | Omit<INotification, 'id' | 'type'>

export const useNotifications = () => {
  const callServiceFactory = useCallback(
    (method: NotificationType) => (message: MessageOrConfig, timeout?: number) => {
      NotificationsService[method]?.(
        typeof message === 'string' ? { id: uuid(), message, timeout } : { ...message, id: uuid() }
      )
    },
    []
  )

  const closeAll = useCallback(() => {
    NotificationsService.closeAll()
  }, [])

  return {
    success: callServiceFactory(INotificationTypeEnum.Success),
    info: callServiceFactory(INotificationTypeEnum.Info),
    warning: callServiceFactory(INotificationTypeEnum.Warning),
    error: callServiceFactory(INotificationTypeEnum.Error),
    closeAll
  }
}
