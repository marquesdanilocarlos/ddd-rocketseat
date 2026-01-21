import QuestionComment from '@/domain/forum/enterprise/entities/question-comment'

export default interface QuestionCommentsRepository {
  findById(questionCommentId: string): Promise<QuestionComment | null>
  create(questionComment: QuestionComment): Promise<QuestionComment>
  delete(questionComment: QuestionComment): Promise<void>
}
