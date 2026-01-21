import AnswerCommentsRepository from '@/domain/forum/application/repositories/answer-comments-repository'

type DeleteAnswerCommentInput = {
  authorId: string
  answerCommentId: string
}

export default class DeleteAnswerComment {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentInput): Promise<void> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error(
        `O comentário com o id: ${answerCommentId} não foi encontrado`,
      )
    }

    if (authorId !== answerComment.authorId.value) {
      throw new Error(
        'Não é permitido deleter comentário de um usuário diferente',
      )
    }

    await this.answerCommentsRepository.delete(answerComment)
  }
}
