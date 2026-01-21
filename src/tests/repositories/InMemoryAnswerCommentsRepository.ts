import AnswerCommentsRepository from '@/domain/forum/application/repositories/answer-comments-repository'
import AnswerComment from '@/domain/forum/enterprise/entities/answer-comment'

export default class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public comments: AnswerComment[] = []
  create(answerComment: AnswerComment): Promise<AnswerComment> {
    this.comments.push(answerComment)
    return Promise.resolve(answerComment)
  }

  delete(answerComment: AnswerComment): Promise<void> {
    const answerCommentIndex = this.comments.findIndex(
      (comment) => comment.id.value === answerComment.id.value,
    )
    this.comments.splice(answerCommentIndex, 1)
    return Promise.resolve()
  }

  findById(answerCommentId: string): Promise<AnswerComment | null> {
    const answerComment =
      this.comments.find((comment) => comment.id.value === answerCommentId) ??
      null
    return Promise.resolve(answerComment)
  }
}
