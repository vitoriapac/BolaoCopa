import Fastify from "fastify";
import cors from '@fastify/cors'
import ShortUniqueID from 'short-unique-id'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'],
})

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  // http://127.0.0.1:3333/pools/count  http://localhost:3333/pools
  //Count pool
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()

    return { count }
  })

  //Count user
  fastify.get('/users/count', async () => {
    const count = await prisma.user.count()

    return { count }
  })

  //Count guess
  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()

    return { count }
  })

  //Create a new pool
  fastify.post('/pools', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    })

    const { title } = createPoolBody.parse(request.body)

    const generate = new ShortUniqueID({ length: 6 })
    const code = String(generate()).toUpperCase()

    await prisma.pool.create({
      data: {
        title,
        code,
      }
    })

    return reply.status(201).send({ code })
  })

  await fastify.listen({ port: 3333, /* host: '0.0.0.0' */ });
}

bootstrap()