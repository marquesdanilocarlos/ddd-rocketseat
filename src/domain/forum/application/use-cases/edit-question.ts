import QuestionsRepository from '@/domain/forum/application/repositories/questions-repository'
import Question from '@/domain/forum/enterprise/entities/question'

type EditQuestionInput = {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionOutput = {
  question: Question
}

export default class EditQuestion {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(input: EditQuestionInput): Promise<EditQuestionOutput> {
    const { authorId, questionId, title, content } = input
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error(`A pergunta com o id: ${questionId} não foi encontrada`)
    }

    if (authorId !== question.authorId.value) {
      throw new Error(
        'Não é permitido editar a pergunta de um usuário diferente',
      )
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return { question }
  }
}
