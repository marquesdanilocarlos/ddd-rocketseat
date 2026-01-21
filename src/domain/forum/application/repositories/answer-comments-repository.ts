import AnswerComment from '@/domain/forum/enterprise/entities/answer-comment'

export default interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<AnswerComment>
}
