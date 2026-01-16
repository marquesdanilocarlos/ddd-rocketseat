import Question from '@/domain/forum/enterprise/entities/question'
import Slug from '@/domain/forum/enterprise/entities/value-objects/slug'

export default interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  create(question: Question): Promise<Question>
  findBySlug(slug: Slug): Promise<Question | null>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<Question>
}
