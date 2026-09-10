import { MessagesService } from "../services/messages.service.js";

const messagesService = new MessagesService();

export const getMessages = async (req, res) => {
    try {
        const messages = await messagesService.getMessages();

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los mensajes"
        });
    }
};

export const getMessageById = async (req, res) => {
    try {
        const message = await messagesService.getMessageById(req.params.mid);

        if (!message) {
            return res.status(404).json({
                mensaje: "Mensaje no encontrado"
            });
        }

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el mensaje"
        });
    }
};

export const createMessage = async (req, res) => {
    try {
        const message = await messagesService.createMessage(req.body);

        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const message = await messagesService.deleteMessage(req.params.mid);

        if (!message) {
            return res.status(404).json({
                mensaje: "Mensaje no encontrado"
            });
        }

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el mensaje"
        });
    }
};