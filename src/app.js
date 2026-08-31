import express from "express";
import servicesRouter from "./routes/services.router.js";
import { env } from "./config/env.config.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Funciona");
});

app.use("/api/services", servicesRouter);

app.listen(env.port, () => {
  console.log(`Servidor escuchando en el puerto ${env.port}`);
  console.log(`Entorno: ${env.nodeEnv}`);
});