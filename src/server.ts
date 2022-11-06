import Fastify from "fastify";
import cors from "@fastify/cors";

import { pollRoutes } from "./routes/poll";
import { userRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";
import { gameRoutes } from "./routes/game";
import { authRoutes } from "./routes/auth";

// singleton -> reaproveita varios arquivos ja executados

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true    // para ambientes em produção geralmente informamos o host que vai acessar o backend
    })

    await fastify.register(authRoutes);
    await fastify.register(pollRoutes);
    await fastify.register(userRoutes);
    await fastify.register(guessRoutes);
    await fastify.register(gameRoutes);
   
    await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()