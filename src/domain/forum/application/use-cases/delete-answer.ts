import AnswersRepository from '@/domain/forum/application/repositories/answers-repository'

type DeleteAnswerInput = {
  authorId: string
  answerId: string
}

export default class DeleteAnswer {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ authorId, answerId }: DeleteAnswerInput): Promise<void> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error(`A resposta com o id: ${answerId} não foi encontrada`)
    }

    if (authorId !== answer.authorId.value) {
      throw new Error(
        'Não é permitido deleter a resposta de um usuário diferente',
      )
    }

    await this.answersRepository.delete(answer)
  }
}
