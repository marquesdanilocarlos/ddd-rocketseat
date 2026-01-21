import QuestionCommentsRepository from '@/domain/forum/application/repositories/question-comments-repository'
import QuestionComment from '@/domain/forum/enterprise/entities/question-comment'

export default class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public comments: QuestionComment[] = []
  create(questionComment: QuestionComment): Promise<QuestionComment> {
    this.comments.push(questionComment)
    return Promise.resolve(questionComment)
  }

  delete(questionComment: QuestionComment): Promise<void> {
    const questionCommentIndex = this.comments.findIndex(
      (comment) => comment.id.value === questionComment.id.value,
    )
    this.comments.splice(questionCommentIndex, 1)
    return Promise.resolve()
  }

  findById(questionCommentId: string): Promise<QuestionComment | null> {
    const questionComment =
      this.comments.find((comment) => comment.id.value === questionCommentId) ??
      null
    return Promise.resolve(questionComment)
  }
}
