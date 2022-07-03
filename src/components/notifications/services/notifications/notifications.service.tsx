import { Subject } from 'rxjs'
import { v4 as uuid } from 'uuid'

export enum INotificationTypeEnum {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  ClearAll = 'clearAll'
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error'
export type NotificationAction = NotificationType | 'clearAll'

export interface INotification {
  id: string
  type: NotificationAction
  title?: string
  message?: string
  timeout?: number
  onClick?: () => void
}

let notificationsSubject: Subject<INotification>

export class NotificationsService {
  public static get notifications(): Subject<INotification> {
    if (notificationsSubject === undefined) {
      notificationsSubject = new Subject<INotification>()
    }

    return notificationsSubject
  }

  public static success(notification: Omit<INotification, 'type'>): void {
    NotificationsService.notifications.next({
      type: INotificationTypeEnum.Success,
      ...notification
    })
  }

  public static info(notification: Omit<INotification, 'type'>): void {
    NotificationsService.notifications.next({
      type: INotificationTypeEnum.Info,
      ...notification
    })
  }

  public static warning(notification: Omit<INotification, 'type'>): void {
    NotificationsService.notifications.next({
      type: INotificationTypeEnum.Warning,
      ...notification
    })
  }

  public static error(notification: Omit<INotification, 'type'>): void {
    NotificationsService.notifications.next({
      type: INotificationTypeEnum.Error,
      ...notification
    })
  }

  public static closeAll(): void {
    NotificationsService.notifications.next({
      id: uuid(),
      type: INotificationTypeEnum.ClearAll
    })
  }
}
