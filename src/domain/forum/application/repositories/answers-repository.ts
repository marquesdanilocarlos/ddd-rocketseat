import Answer from '@/domain/forum/enterprise/entities/answer'

export default interface AnswersRepository {
  findById(id: string): Promise<Answer | null>
  create(answer: Answer): Promise<Answer>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<Answer>
}
