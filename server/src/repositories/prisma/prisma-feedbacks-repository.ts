import { prisma } from '../../prisma';
import { FeedbacksRepository, FeedbackCreateData } from './../feedbacks-repository';

export class PrismaFeedbackRepository implements FeedbacksRepository {
  async create({ comment, type, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      }
    })
  }
}