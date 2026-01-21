import QuestionCommentsRepository from '@/domain/forum/application/repositories/question-comments-repository'
import QuestionComment from '@/domain/forum/enterprise/entities/question-comment'

export default class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public comments: QuestionComment[] = []
  create(questionComment: QuestionComment): Promise<QuestionComment> {
    this.comments.push(questionComment)
    return Promise.resolve(questionComment)
  }
}
