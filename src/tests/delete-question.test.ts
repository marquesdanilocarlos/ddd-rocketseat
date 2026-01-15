import InMemoryQuestionsRepository from '@/tests/repositories/InMemoryQuestionsRepository'
import DeleteQuestion from '@/domain/forum/application/use-cases/delete-question'
import Question from '@/domain/forum/enterprise/entities/question'
import makeQuestion from '@/tests/factories/make-question'
import UniqueEntityId from '@/core/entities/unique-entity-id'

describe('Deleção de pergunta', () => {
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let sut: DeleteQuestion

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestion(inMemoryQuestionsRepository)
  })

  it('Deve remover uma pergunta pelo id', async () => {
    const newQuestion: Question = makeQuestion(
      { authorId: new UniqueEntityId('author-sinistro') },
      new UniqueEntityId('to-delete-question'),
    )
    const question = await inMemoryQuestionsRepository.create(newQuestion)
    await sut.execute({ authorId: question.authorId, questionId: question.id })
    expect(inMemoryQuestionsRepository.questions).toHaveLength(0)
  })

  it('Não deve deletar pergunta se o id do autor for diferente', async () => {
    const newQuestion: Question = makeQuestion(
      { authorId: new UniqueEntityId('autor-sinistro') },
      new UniqueEntityId('to-delete-question'),
    )
    const question = await inMemoryQuestionsRepository.create(newQuestion)

    expect(async () => {
      await sut.execute({
        authorId: new UniqueEntityId('outro-autor'),
        questionId: question.id,
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
