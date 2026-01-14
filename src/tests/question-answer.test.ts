import { expect, test } from 'vitest'
import QuestionAnswer from '@/domain/use-cases/question-answer'
import AnswersRepository from '@/domain/repositories/answers-repository'
import Answer from '@/domain/entities/answer'

test('Deve responder uma pergunta', async () => {
  const questionAnswerData = {
    instructorId: '1',
    questionId: '1',
    content: 'Tú é burro?',
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
