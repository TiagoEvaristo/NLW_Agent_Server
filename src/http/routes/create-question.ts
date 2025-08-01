import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod/v4"
import { db } from "../../db/connection.ts"
import { schema } from "../../db/schema/index.ts"
import { generateAnswer, generateEmbeddings } from "../../services/gemini.ts"
import { and, eq, sql } from "drizzle-orm"
import { trace } from "console"

export const createQuestionRoute: FastifyPluginCallbackZod = (app)=> {
    app.post('/rooms/:roomId/questions', {
        schema : {
            params: z.object({
                roomId : z.string()
            }),
            body: z.object({
                question: z.string().min(1, "Name is required"), 
            }),
        }
    }, async (request, reply) => {
        const {question} = request.body
        const {roomId} = request.params

        const embeddings = await generateEmbeddings(question)
        const embeddingsAsString = `[${embeddings.join(', ')}]`

        const chunks = await db
            .select({
                id: schema.audioChunks.id,
                transcription: schema.audioChunks.transcription,
                similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <-> ${embeddingsAsString}::vector)`
            })
            .from(schema.audioChunks)
           
            .limit(3)
            .where(
                and(
                    eq(schema.audioChunks.roomId, roomId),
                    sql`1 - (${schema.audioChunks.embeddings} <-> ${embeddingsAsString}::vector) < 0.7`
                )
            )
            .orderBy(sql`(${schema.audioChunks.embeddings} <-> ${embeddingsAsString}::vector)`)

        let answer: string | null = null
        
        if( chunks.length > 0) {
            const transcriptions = chunks.map(chunk => chunk.transcription)

            answer = await generateAnswer(question, transcriptions)
        }

        const result = await db.insert(schema.questions).values({
            roomId, question, answer
        }).returning()

        const insertedQuestions = result[0]

        if (!insertedQuestions ){
            throw new Error("Failed to create room")
        }

        return reply.status(201).send({ 
            roomId: insertedQuestions.id,
            answer,
        })

        // return chunks    

    })
}