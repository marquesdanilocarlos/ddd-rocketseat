import Answer from '@/domain/forum/enterprise/entities/answer'

export default interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
