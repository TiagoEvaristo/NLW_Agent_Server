
import {pgTable, uuid, text, timestamp, vector} from 'drizzle-orm/pg-core';

export const audioChunks = pgTable('audio_chunks', {
    id: uuid('id').primaryKey().defaultRandom(),
    roomId: uuid('room_id').notNull(),
    transcription: text().notNull(),
    embeddings: vector({ dimensions: 768 }).notNull(), 
    createdAt: timestamp().defaultNow().notNull(),
});    
