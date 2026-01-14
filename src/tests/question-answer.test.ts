import QuestionAnswer from '@/domain/use-cases/question-answer'
import AnswersRepository from '@/domain/repositories/answers-repository'
import Answer from '@/domain/entities/answer'
import UniqueEntityId from '@/core/entities/unique-entity-id'

test('Deve responder uma pergunta', async () => {
  const questionAnswerData = {
    instructorId: new UniqueEntityId(),
    questionId: new UniqueEntityId(),
    content: 'Tú é burro?',
    createdAt: new Date(),
  }

  const fakeAnswersRespository: AnswersRepository = {
    async create(answer: Answer): Promise<void> {
      return Promise.resolve()
    },
  }

  const { answer } = new QuestionAnswer(fakeAnswersRespository).execute(
    questionAnswerData,
  )

  expect(answer.content).toEqual('Tú é burro?')
})
