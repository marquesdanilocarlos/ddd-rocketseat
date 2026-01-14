import Entity from '@/core/entities/entity'
import UniqueEntityId from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

type AnswerProps = {
  content: string
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}

export default class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  public static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityId,
  ): Answer {
    return new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
  }
}
