import Slug from '@/domain/forum/enterprise/entities/value-objects/slug'
import Entity from '@/core/entities/entity'
import UniqueEntityId from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'

type QuestionProps = {
  authorId: UniqueEntityId
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
  bestAnswerId?: UniqueEntityId
}

export default class Question extends Entity<QuestionProps> {
  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId(): UniqueEntityId | null {
    return this.props.bestAnswerId ?? null
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.content = content
    this.touch()
  }

  set title(title: string) {
    this.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  public static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ): Question {
    return new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )
  }
}
