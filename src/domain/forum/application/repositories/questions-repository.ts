import Question from '@/domain/forum/enterprise/entities/question'
import Slug from '@/domain/forum/enterprise/entities/value-objects/slug'

export default interface QuestionsRepository {
  create(question: Question): Promise<Question>
  findBySlug(slug: Slug): Promise<Question | null>
}
