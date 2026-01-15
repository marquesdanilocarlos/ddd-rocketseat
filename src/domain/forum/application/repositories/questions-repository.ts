import Question from '@/domain/forum/enterprise/entities/question'
import Slug from '@/domain/forum/enterprise/entities/value-objects/slug'
import UniqueEntityId from '@/core/entities/unique-entity-id'

export default interface QuestionsRepository {
  findById(id: UniqueEntityId): Promise<Question | null>
  create(question: Question): Promise<Question>
  findBySlug(slug: Slug): Promise<Question | null>
  delete(id: UniqueEntityId): Promise<void>
}
