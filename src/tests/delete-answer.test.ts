import InMemoryAnswersRepository from '@/tests/repositories/in-memory-answers-repository'
import DeleteAnswer from '@/domain/forum/application/use-cases/delete-answer'
import UniqueEntityId from '@/core/entities/unique-entity-id'
import Answer from '@/domain/forum/enterprise/entities/answer'
import makeAnswer from '@/tests/factories/make-answer'

describe('Deleção de resposta', () => {
  let inMemoryAnswersRepository: InMemoryAnswersRepository
  let sut: DeleteAnswer

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswer(inMemoryAnswersRepository)
  })

  it('Deve remover uma pergunta pelo id', async () => {
    const newAnswer: Answer = makeAnswer(
      { authorId: new UniqueEntityId('author-sinistro') },
      'to-delete-answer',
    )
    const answer = await inMemoryAnswersRepository.create(newAnswer)
    await sut.execute({
      authorId: answer.authorId.value,
      answerId: answer.id.value,
    })
    expect(inMemoryAnswersRepository.answers).toHaveLength(0)
  })

  it('Não deve deletar resposta se o id do autor for diferente', async () => {
    const newAnswer: Answer = makeAnswer(
      { authorId: new UniqueEntityId('autor-sinistro') },
      'to-delete-answer',
    )
    const answer = await inMemoryAnswersRepository.create(newAnswer)

    expect(async () => {
      await sut.execute({
        authorId: 'outro-autor',
        answerId: answer.id.value,
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
