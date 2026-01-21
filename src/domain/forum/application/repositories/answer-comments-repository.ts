import AnswerComment from '@/domain/forum/enterprise/entities/answer-comment'

export default interface AnswerCommentsRepository {
  findById(answerCommentId: string): Promise<AnswerComment | null>
  create(answerComment: AnswerComment): Promise<AnswerComment>
  delete(answerComment: AnswerComment): Promise<void>
}
