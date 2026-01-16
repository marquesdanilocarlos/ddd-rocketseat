import AnswersRepository from '@/domain/forum/application/repositories/answers-repository'
import Answer from '@/domain/forum/enterprise/entities/answer'

export default class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []
  async findById(id: string): Promise<Answer | null> {
    const answer =
      this.answers.find((question) => question.id.value === id) ?? null
    return Promise.resolve(answer)
  }

  async create(answer: Answer): Promise<Answer> {
    this.answers.push(answer)
    return Promise.resolve(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex(
      (item) => item.id.value === answer.id.value,
    )

    if (answerIndex === -1) {
      return
    }

    this.answers.splice(answerIndex, 1)
    return Promise.resolve()
  }
}
