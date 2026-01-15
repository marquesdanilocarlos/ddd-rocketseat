import Question from '@/domain/forum/enterprise/entities/question'

export default interface QuestionsRepository {
  create(question: Question): Promise<Question>
}
