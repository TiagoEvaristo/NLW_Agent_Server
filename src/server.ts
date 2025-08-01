import {fastify} from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import {fastifyCors} from '@fastify/cors';
import { env } from './env.ts';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { createRoomRoute } from './http/routes/create-room.ts';
import { getRoomsQuestions } from './http/routes/get-room-question.ts';
import { createQuestionRoute } from './http/routes/create-question.ts';
import { uploadAudioRoute } from './http/routes/upload-audio.ts';
import { fastifyMultipart } from '@fastify/multipart';


const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: 'http://localhost:5173',
});

app.register(fastifyMultipart)

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
    return 'ok';
});

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomsQuestions)
app.register(createQuestionRoute)
app.register(uploadAudioRoute)

app.listen({
    port: env.PORT,
}).then(() => {
    console.log('Server is running on port', env.PORT);
    console.log('Server is running on http://localhost:3333');
})