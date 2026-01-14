import { randomUUID } from 'node:crypto'

type AnswerProps = {
  content: string
  authorId: string
  questionId: string
}

export default class Answer {
  public id: string
  public content: string
  public authorId: string
  public questionId: string

  constructor(props: AnswerProps, id?: string) {
    this.content = props.content
    this.id = id ?? randomUUID()
    this.authorId = props.authorId
    this.questionId = props.questionId
  }
}
