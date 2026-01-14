import Entity from '@/core/entities/entity'

type AnswerProps = {
  content: string
  authorId: string
  questionId: string
}

export default class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }
}
