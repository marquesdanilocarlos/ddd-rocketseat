import QuestionsRepository from '@/domain/forum/application/repositories/questions-repository'
import Question from '@/domain/forum/enterprise/entities/question'
import Slug from '@/domain/forum/enterprise/entities/value-objects/slug'

export default class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []
  async create(question: Question): Promise<Question> {
    this.questions.push(question)
    return Promise.resolve(question)
  }

  findBySlug(slug: Slug): Promise<Question | null> {
    const question =
      this.questions.find((question) => question.slug === slug) ?? null
    return Promise.resolve(question)
  }
}
