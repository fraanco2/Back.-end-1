import { z } from "zod";

const objectIdSchema = z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    "El ID debe ser un ObjectId válido"
);

export const createBookingSchema = z.object({
    clientName: z.string().min(1, "El nombre del cliente es obligatorio"),
    clientEmail: z.string().email("El email no es válido"),
    date: z.string().min(1, "La fecha es obligatoria"),
    time: z.string().min(1, "La hora es obligatoria"),
    status: z.string().min(1, "El estado es obligatorio"),
    services: z.array(
        z.object({
            service: objectIdSchema,
            quantity: z.number().int().positive(
                "La cantidad debe ser un número entero mayor a 0"
            )
        })
    ).optional()
});

export const bookingParamsSchema = z.object({
    bid: objectIdSchema,
    sid: objectIdSchema
});