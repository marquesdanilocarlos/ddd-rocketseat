import makeAnswer from '@/tests/factories/make-answer'
import InMemoryAnswersRepository from '@/tests/repositories/in-memory-answers-repository'
import InMemoryQuestionsRepository from '@/tests/repositories/in-memory-questions-repository'
import SendNotification, {
  SendNotificationInput,
} from '@/domain/notification/application/use-cases/send-notification'
import InMemoryNotificationsRepository from '@/tests/repositories/in-memory-notifications-repository'
import makeQuestion from '@/tests/factories/make-question'
import Notification from '@/domain/notification/enterprise/notification'
import { Mock } from 'vitest'
import { waitFor } from '@/tests/utils/wait-for'
import OnQuestionBestAnswerChosen from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryquestionsRepository: InMemoryQuestionsRepository
let sendNotification: SendNotification
let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sendNotificationSpy: Mock<
  (input: SendNotificationInput) => Promise<{ notification: Notification }>
>

beforeEach(() => {
  inMemoryAnswersRepository = new InMemoryAnswersRepository()
  inMemoryquestionsRepository = new InMemoryQuestionsRepository()
  inMemoryNotificationRepository = new InMemoryNotificationsRepository()
  sendNotification = new SendNotification(inMemoryNotificationRepository)

  sendNotificationSpy = vi.spyOn(sendNotification, 'execute')

  new OnQuestionBestAnswerChosen(inMemoryAnswersRepository, sendNotification)
})

describe('Subscriber de resposta escolhida', () => {
  it('Deve enviar uma notificação quando uma resposta é escolhida a melhor', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    await inMemoryquestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id
    await inMemoryquestionsRepository.save(question)

    await waitFor(() => {
      expect(sendNotificationSpy).toHaveBeenCalled()
    })
  })
})
