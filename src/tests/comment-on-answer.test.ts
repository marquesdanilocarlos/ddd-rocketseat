import makeAnswer from '@/tests/factories/make-answer'
import Answer from '@/domain/forum/enterprise/entities/answer'
import InMemoryAnswersRepository from '@/tests/repositories/InMemoryAnswersRepository'
import InMemoryAnswerCommentsRepository from '@/tests/repositories/InMemoryAnswerCommentsRepository'
import CommentOnAnswer from '@/domain/forum/application/use-cases/comment-on-answer'

describe('Comentários de respostas', () => {
  let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
  let inMemoryAnswersRepository: InMemoryAnswersRepository
  let sut: CommentOnAnswer

  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new CommentOnAnswer(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('Deve comentar numa pergunta', async () => {
    const newAnswer: Answer = makeAnswer()
    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.value,
      authorId: newAnswer.authorId.value,
      content: 'Comentário Maroto',
    })

    expect(inMemoryAnswerCommentsRepository.comments[0].content).toEqual(
      'Comentário Maroto',
    )
  })
})
