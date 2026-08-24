import express from 'express';
import { env } from './config/env.config.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

app.listen(env.port, () => {
    console.log(`Servidor escuchando en el puerto ${env.port}`);
    console.log(`Entorno: ${env.nodeEnv}`);
});