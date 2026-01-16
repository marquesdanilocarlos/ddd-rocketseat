import QuestionsRepository from '@/domain/forum/application/repositories/questions-repository'
import AnswersRepository from '@/domain/forum/application/repositories/answers-repository'

type ChooseBestQuestionAnswerInput = {
  answerId: string
  authorId: string
}

export default class ChooseBestQuestionAnswer {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseBestQuestionAnswerInput): Promise<void> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Resposta não encontrada.')
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.value,
    )

    if (!question) {
      throw new Error('Pergunta não encontrada.')
    }

    if (question.authorId.value !== authorId) {
      throw new Error(
        'Não é possível selecionar a melhor resposta para a pergunta com esse autor.',
      )
    }

    question.bestAnswerId = answer.id
    await this.questionsRepository.save(question)
  }
}
