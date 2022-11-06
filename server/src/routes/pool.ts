import { FastifyInstance } from 'fastify'
import ShortUniqueID from 'short-unique-id'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function poolRoutes(fastify: FastifyInstance){
  //Count pool
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()
    
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
}
// http://127.0.0.1:3333/pools/count  http://localhost:3333/pools