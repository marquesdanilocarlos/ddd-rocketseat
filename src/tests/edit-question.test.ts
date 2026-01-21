import InMemoryQuestionsRepository from '@/tests/repositories/in-memory-questions-repository'
import EditQuestion from '@/domain/forum/application/use-cases/edit-question'
import Question from '@/domain/forum/enterprise/entities/question'
import makeQuestion from '@/tests/factories/make-question'
import UniqueEntityId from '@/core/entities/unique-entity-id'
import { UnauthorizedError } from '@/core/errors'

describe('Edição de pergunta', () => {
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let sut: EditQuestion

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestion(inMemoryQuestionsRepository)
  })

  it('Deve editar uma pergunta pelo id', async () => {
    const newQuestion: Question = makeQuestion(
      { authorId: new UniqueEntityId('author-sinistro') },
      'to-delete-question',
    )
    const question = await inMemoryQuestionsRepository.create(newQuestion)
    await sut.execute({
      authorId: question.authorId.value,
      questionId: question.id.value,
      title: 'Novo título',
      content: 'Novo Conteúdo',
    })
    expect(inMemoryQuestionsRepository.questions[0]).toMatchObject({
      title: 'Novo título',
      content: 'Novo Conteúdo',
    })
  })

  it('Não deve editar pergunta se o id do autor for diferente', async () => {
    const newQuestion: Question = makeQuestion(
      { authorId: new UniqueEntityId('autor-sinistro') },
      'to-delete-question',
    )
    const question = await inMemoryQuestionsRepository.create(newQuestion)

    expect(async () => {
      await sut.execute({
        authorId: 'outro-autor',
        questionId: question.id.value,
        title: 'Novo título',
        content: 'Novo Conteúdo',
      })
    }).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
