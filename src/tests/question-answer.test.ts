import { expect, test } from 'vitest'
import QuestionAnswer from '@/domain/use-cases/question-answer'

test('Deve responder uma pergunta', async () => {
  const questionAnswerData = {
    instructorId: '1',
    questionId: '1',
    content: 'Tú é burro?',
  }

  const { answer } = new QuestionAnswer().execute(questionAnswerData)

  expect(answer.content).toEqual('Tú é burro?')
})
