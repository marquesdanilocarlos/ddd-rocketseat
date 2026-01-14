import Slug from '@/domain/entities/value-objects/slug'
import Entity from '@/core/entities/entity'
import UniqueEntityId from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

type QuestionProps = {
  authorId: UniqueEntityId
  bestAnswerId: UniqueEntityId
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export default class Question extends Entity<QuestionProps> {
  public static create(
    props: Optional<QuestionProps, 'createdAt'>,
    id?: UniqueEntityId,
  ): Question {
    return new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
  }
}
