import AnswersRepository from '@/domain/forum/application/repositories/answers-repository'
import Answer from '@/domain/forum/enterprise/entities/answer'

type EditAnswerInput = {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerOutput = {
  answer: Answer
}

export default class EditAnswer {
  constructor(private answersRepository: AnswersRepository) {}

  async execute(input: EditAnswerInput): Promise<EditAnswerOutput> {
    const { authorId, answerId, content } = input
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error(`A resposta com o id: ${answerId} não foi encontrada`)
    }

    if (authorId !== answer.authorId.value) {
      throw new Error(
        'Não é permitido editar a resposta de um usuário diferente',
      )
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return { answer }
  }
}
