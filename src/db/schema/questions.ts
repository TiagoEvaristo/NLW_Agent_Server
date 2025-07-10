
import {pgTable, uuid, text, timestamp} from 'drizzle-orm/pg-core';

export const questions = pgTable('questions', {
    id: uuid('id').primaryKey().defaultRandom(),
    roomId: uuid('room_id').notNull(),
    question: text().notNull(),
    answer: text(),
    createdAt: timestamp().defaultNow().notNull(),
});    
