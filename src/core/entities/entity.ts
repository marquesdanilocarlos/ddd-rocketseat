import UniqueEntityId from '@/core/entities/unique-entity-id'

export default abstract class Entity<Props> {
  private _id: UniqueEntityId
  protected props: Props

  get id() {
    return this._id
  }

  constructor(props: Props, id?: string) {
    this._id = new UniqueEntityId(id)
    this.props = props
  }
}
