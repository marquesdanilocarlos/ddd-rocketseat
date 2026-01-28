import OnAnswerCreated from '@/domain/notification/application/subscribers/on-answer-created'
import makeAnswer from '@/tests/factories/make-answer'
import InMemoryAnswersRepository from '@/tests/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository

beforeEach(() => {
  inMemoryAnswersRepository = new InMemoryAnswersRepository()
})

describe('Subscriber de resposta criada', () => {
  it('Deve enviar uma notificação quando uma resposta é criada', () => {
    new OnAnswerCreated()

    const answer = makeAnswer()
    inMemoryAnswersRepository.create(answer)
  })
})
