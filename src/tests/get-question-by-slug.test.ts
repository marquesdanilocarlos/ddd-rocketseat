import InMemoryQuestionsRepository from '@/tests/repositories/InMemoryQuestionsRepository'
import GetQuestionBySlug from '@/domain/forum/application/use-cases/get-question-by-slug'
import Question from '@/domain/forum/enterprise/entities/question'
import Slug from '@/domain/forum/enterprise/entities/value-objects/slug'
import UniqueEntityId from '@/core/entities/unique-entity-id'

describe('Consulta de pergunta', () => {
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let sut: GetQuestionBySlug

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlug(inMemoryQuestionsRepository)
  })

  it('Deve obter uma pergunta pelo slug', async () => {
    const newQuestion: Question = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Questão importante',
      content: 'Porque não funciona?',
      slug: Slug.create('questao-importante'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({ slug: newQuestion.slug })

    expect(question.id).toBeTruthy()
    expect(question.slug).toEqual(newQuestion.slug)
  })
})
