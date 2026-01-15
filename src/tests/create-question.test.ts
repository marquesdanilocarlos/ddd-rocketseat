import Question from '@/domain/forum/enterprise/entities/question'
import CreateQuestion, {
  CreateQuestionInput,
} from '@/domain/forum/application/use-cases/create-question'
import QuestionsRepository from '@/domain/forum/application/repositories/questions-repository'

it('Deve criar uma nova pergunta', async () => {
  const newQuestionData: CreateQuestionInput = {
    authorId: '1',
    title: 'Nova Pergunta',
    content: 'Como funciona isso',
  }

  const fakeQuestionRepository: QuestionsRepository = {
    async create(question: Question) {
      return Promise.resolve(question)
    },
  }
  const createQuestionUseCase = new CreateQuestion(fakeQuestionRepository)
  const { question } = await createQuestionUseCase.execute(newQuestionData)
  expect(question.id).toBeTruthy()
})
