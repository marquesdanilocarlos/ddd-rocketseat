import QuestionComment from '@/domain/forum/enterprise/entities/question-comment'

export default interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<QuestionComment>
}
