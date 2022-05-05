import express from 'express'

import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body
  
  const prismaFeedbacksRepository = new PrismaFeedbackRepository()
  const nodeMailerMailAdapter = new NodemailerMailAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository, 
    nodeMailerMailAdapter
  )

  await submitFeedbackUseCase.execute({
    comment,
    type,
    screenshot
  })

  return res.status(201).send()
})