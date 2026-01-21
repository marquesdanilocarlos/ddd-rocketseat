import QuestionCommentsRepository from '@/domain/forum/application/repositories/question-comments-repository'

type DeleteQuestionCommentInput = {
  authorId: string
  questionCommentId: string
}

export default class DeleteQuestionComment {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentInput): Promise<void> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error(
        `O comentário com o id: ${questionCommentId} não foi encontrado`,
      )
    }

    if (authorId !== questionComment.authorId.value) {
      throw new Error(
        'Não é permitido deleter comentário de um usuário diferente',
      )
    }

    await this.questionCommentsRepository.delete(questionComment)
  }
}
