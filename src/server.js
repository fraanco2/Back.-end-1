import app from "./app.js";
import { env } from "./config/env.config.js";
import { connectDB } from "./config/database.config.js";

const startServer = async () => {
    await connectDB();

    app.listen(env.port, () => {
        console.log(`Servidor escuchando en el puerto ${env.port}`);
        console.log(`Entorno: ${env.nodeEnv}`);
    });
};

startServer();