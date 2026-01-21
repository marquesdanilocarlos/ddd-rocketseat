import AnswerCommentsRepository from '@/domain/forum/application/repositories/answer-comments-repository'
import AnswerComment from '@/domain/forum/enterprise/entities/answer-comment'

export default class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public comments: AnswerComment[] = []
  create(answerComment: AnswerComment): Promise<AnswerComment> {
    this.comments.push(answerComment)
    return Promise.resolve(answerComment)
  }
}
