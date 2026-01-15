import InMemoryQuestionsRepository from '@/tests/repositories/InMemoryQuestionsRepository'
import GetQuestionBySlug from '@/domain/forum/application/use-cases/get-question-by-slug'
import Question from '@/domain/forum/enterprise/entities/question'
import Slug from '@/domain/forum/enterprise/entities/value-objects/slug'
import makeQuestion from '@/tests/factories/make-question'

describe('Consulta de pergunta', () => {
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let sut: GetQuestionBySlug

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlug(inMemoryQuestionsRepository)
  })

  it('Deve obter uma pergunta pelo slug', async () => {
    const newQuestion: Question = makeQuestion({
      title: 'Pergunta marota',
      slug: Slug.create('pergunta-marota'),
    })
    await inMemoryQuestionsRepository.create(newQuestion)
    const { question } = await sut.execute({ slug: newQuestion.slug })
    expect(question.id).toBeTruthy()
    expect(question.slug).toEqual(newQuestion.slug)
  })
})
