import QuestionAnswer from '@/domain/forum/application/use-cases/question-answer'
import UniqueEntityId from '@/core/entities/unique-entity-id'
import InMemoryAnswersRepository from '@/tests/repositories/InMemoryAnswersRepository'

describe('Criacão de respostas', () => {
  let inMemoryAnswersRepository: InMemoryAnswersRepository
  let sut: QuestionAnswer

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new QuestionAnswer(inMemoryAnswersRepository)
  })

  test('Deve responder uma pergunta', async () => {
    const questionAnswerData = {
      instructorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: 'Deve ser feito assim',
      createdAt: new Date(),
    }

    const { answer } = await sut.execute(questionAnswerData)
    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.answers[0].id).toEqual(answer.id)
  })
})
