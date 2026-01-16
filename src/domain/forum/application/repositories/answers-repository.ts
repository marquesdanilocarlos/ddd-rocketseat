import Answer from '@/domain/forum/enterprise/entities/answer'
import UniqueEntityId from '@/core/entities/unique-entity-id'

export default interface AnswersRepository {
  findById(id: UniqueEntityId): Promise<Answer | null>
  create(answer: Answer): Promise<Answer>
  delete(id: UniqueEntityId): Promise<void>
}
