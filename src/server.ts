import {fastify} from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import {fastifyCors} from '@fastify/cors';
import { sql } from './db/connection.ts';
import { env } from './env.ts';
import { register } from 'module';
import { getRoomsRoute } from './http/routes/get-rooms.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
    return 'ok';
});

app.register(getRoomsRoute)

app.listen({
    port: env.PORT,
}).then(() => {
    console.log('Server is running on port', env.PORT);
    console.log('Server is running on http://localhost:3333');
})