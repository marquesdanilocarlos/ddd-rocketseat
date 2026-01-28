import { EventHandler } from '@/core/events/event-handler'
import { DomainEvents } from '@/core/events/domain-events'
import AnswerCreatedEvent from '@/domain/forum/enterprise/events/answer-created-event'
import { DomainEvent } from '@/core/events/domain-event'

export default class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification(event: DomainEvent): Promise<void> {
    const answerCreatedEvent = event as AnswerCreatedEvent
  }
}
