import Notification from '@/domain/notification/enterprise/notification'

export default interface NotificationsRepository {
  create(notification: Notification): Promise<Notification>
}
