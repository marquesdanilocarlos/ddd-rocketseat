import AnswersRepository from '@/domain/forum/application/repositories/answers-repository'
import Answer from '@/domain/forum/enterprise/entities/answer'

export default class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []
  async create(answer: Answer): Promise<Answer> {
    this.answers.push(answer)
    return Promise.resolve(answer)
  }
}
