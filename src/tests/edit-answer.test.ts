import InMemoryAnswersRepository from '@/tests/repositories/InMemoryAnswersRepository'
import UniqueEntityId from '@/core/entities/unique-entity-id'
import Answer from '@/domain/forum/enterprise/entities/answer'
import makeAnswer from '@/tests/factories/make-answer'
import EditAnswer from '@/domain/forum/application/use-cases/edit-answer'

describe('Edição de resposta', () => {
  let inMemoryAnswersRepository: InMemoryAnswersRepository
  let sut: EditAnswer

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswer(inMemoryAnswersRepository)
  })

  it('Deve editar uma pergunta pelo id', async () => {
    const newAnswer: Answer = makeAnswer(
      { authorId: new UniqueEntityId('author-sinistro') },
      'to-edit-answer',
    )
    const answer = await inMemoryAnswersRepository.create(newAnswer)
    await sut.execute({
      authorId: answer.authorId.value,
      answerId: answer.id.value,
      content: 'Novo conteúdo de resposta',
    })
    expect(inMemoryAnswersRepository.answers[0]).toMatchObject({
      content: 'Novo conteúdo de resposta',
    })
  })

  it('Não deve editar resposta se o id do autor for diferente', async () => {
    const newAnswer: Answer = makeAnswer(
      { authorId: new UniqueEntityId('autor-sinistro') },
      'to-edit-answer',
    )
    const answer = await inMemoryAnswersRepository.create(newAnswer)

    expect(async () => {
      await sut.execute({
        authorId: 'outro-autor',
        answerId: answer.id.value,
        content: 'Novo conteúdo de resposta',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
