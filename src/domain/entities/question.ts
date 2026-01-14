import { randomUUID } from 'node:crypto'
import Slug from '@/domain/entities/value-objects/slug'

type QuestionProps = {
  title: string
  content: string
  slug: Slug
  authorId: string
}

export default class Question {
  public id: string
  public title: string
  public content: string
  public slug: Slug
  public authorId: string

  constructor(props: QuestionProps, id?: string) {
    this.title = props.title
    this.content = props.content
    this.id = id ?? randomUUID()
    this.slug = props.slug
    this.authorId = props.authorId
  }
}
