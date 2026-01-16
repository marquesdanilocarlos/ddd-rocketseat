import QuestionsRepository from '@/domain/forum/application/repositories/questions-repository'
import Question from '@/domain/forum/enterprise/entities/question'
import Slug from '@/domain/forum/enterprise/entities/value-objects/slug'

export default class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  async findById(id: string): Promise<Question | null> {
    const question =
      this.questions.find((question) => question.id.value === id) ?? null
    return Promise.resolve(question)
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex(
      (item) => item.id.value === question.id.value,
    )

    this.questions.splice(questionIndex, 1)
    return Promise.resolve()
  }

  async create(question: Question): Promise<Question> {
    this.questions.push(question)
    return Promise.resolve(question)
  }

  findBySlug(slug: Slug): Promise<Question | null> {
    const question =
      this.questions.find((question) => question.slug === slug) ?? null
    return Promise.resolve(question)
  }

  save(question: Question): Promise<Question> {
    const questionIndex = this.questions.findIndex(
      (item) => item.id.value === question.id.value,
    )

    this.questions[questionIndex] = question
    return Promise.resolve(this.questions[questionIndex])
  }
}
