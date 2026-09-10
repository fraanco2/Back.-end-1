import test from "node:test";
import assert from "node:assert/strict";

import { MessagesService } from "../src/services/messages.service.js";

test("MessagesService debe rechazar un mensaje sin usuario", async () => {
    const service = new MessagesService();

    await assert.rejects(
        service.createMessage({
            message: "Mensaje de prueba"
        }),
        {
            message: "Faltan campos obligatorios del mensaje"
        }
    );
});

test("MessagesService debe rechazar un mensaje sin contenido", async () => {
    const service = new MessagesService();

    await assert.rejects(
        service.createMessage({
            user: "Franco"
        }),
        {
            message: "Faltan campos obligatorios del mensaje"
        }
    );
});