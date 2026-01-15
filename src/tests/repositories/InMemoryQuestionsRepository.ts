import QuestionsRepository from '@/domain/forum/application/repositories/questions-repository'
import Question from '@/domain/forum/enterprise/entities/question'

export default class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []
  async create(question: Question): Promise<Question> {
    this.questions.push(question)
    return Promise.resolve(question)
  }
}
