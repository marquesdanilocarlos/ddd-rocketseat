import CreateQuestion, {
  CreateQuestionInput,
} from '@/domain/forum/application/use-cases/create-question'
import InMemoryQuestionsRepository from '@/tests/repositories/InMemoryQuestionsRepository'

describe('Teste de criação de pergunta', () => {
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let sut: CreateQuestion

  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestion(inMemoryQuestionsRepository)
  })

  it('Deve criar uma nova pergunta', async () => {
    const newQuestionData: CreateQuestionInput = {
      authorId: '1',
      title: 'Nova Pergunta',
      content: 'Como funciona isso',
    }
    const { question } = await sut.execute(newQuestionData)
    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.questions[0].id).toEqual(question.id)
  })
})
