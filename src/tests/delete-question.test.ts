import InMemoryQuestionsRepository from '@/tests/repositories/InMemoryQuestionsRepository'
import DeleteQuestion from '@/domain/forum/application/use-cases/delete-question'
import Question from '@/domain/forum/enterprise/entities/question'
import makeQuestion from '@/tests/factories/make-question'
import UniqueEntityId from '@/core/entities/unique-entity-id'

describe('Deleção de pergunta', () => {
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let sut: DeleteQuestion

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestion(inMemoryQuestionsRepository)
  })

  it('Deve remover uma pergunta pelo id', async () => {
    const newQuestion: Question = makeQuestion(
      {},
      new UniqueEntityId('to-delete-question'),
    )
    const question = await inMemoryQuestionsRepository.create(newQuestion)
    await sut.execute({ questionId: question.id })
    expect(inMemoryQuestionsRepository.questions).toHaveLength(0)
  })
})
