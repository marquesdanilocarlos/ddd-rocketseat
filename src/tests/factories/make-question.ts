import Question, {
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import UniqueEntityId from '@/core/entities/unique-entity-id'
import Slug from '@/domain/forum/enterprise/entities/value-objects/slug'

export default function makeQuestion(
  override: Partial<QuestionProps>,
): Question {
  return Question.create({
    authorId: new UniqueEntityId(),
    title: 'Questão importante',
    content: 'Porque não funciona?',
    slug: Slug.create('questao-importante'),
    ...override,
  })
}
