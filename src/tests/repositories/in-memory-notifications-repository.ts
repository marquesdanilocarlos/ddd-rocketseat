import NotificationsRepository from '@/domain/notification/application/repositories/notifications-repository'
import Notification from '@/domain/notification/enterprise/notification'

export default class InMemoryNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[] = []

  async create(notification: Notification): Promise<Notification> {
    this.notifications.push(notification)
    return Promise.resolve(notification)
  }
}
