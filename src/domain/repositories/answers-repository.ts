import Answer from '@/domain/entities/answer'

export default interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
