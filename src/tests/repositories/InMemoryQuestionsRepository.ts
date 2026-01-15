import QuestionsRepository from '@/domain/forum/application/repositories/questions-repository'
import Question from '@/domain/forum/enterprise/entities/question'
import Slug from '@/domain/forum/enterprise/entities/value-objects/slug'
import UniqueEntityId from '@/core/entities/unique-entity-id'

export default class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  async findById(id: UniqueEntityId): Promise<Question | null> {
    const question =
      this.questions.find((question) => question.id === id) ?? null
    return Promise.resolve(question)
  }

  async delete(id: UniqueEntityId): Promise<void> {
    const questionIndex = this.questions.findIndex(
      (question) => question.id === id,
    )

    if (questionIndex === -1) {
      return
    }

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
}
