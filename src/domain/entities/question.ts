import Slug from '@/domain/entities/value-objects/slug'
import Entity from '@/core/entities/entity'

type QuestionProps = {
  title: string
  content: string
  slug: Slug
  authorId: string
}

export default class Question extends Entity<QuestionProps> {}
