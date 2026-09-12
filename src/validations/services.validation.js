import { z } from "zod";

export const createServiceSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    description: z.string().min(1, "La descripción es obligatoria"),
    duration: z.number().positive("La duración debe ser mayor a 0"),
    price: z.number().nonnegative("El precio no puede ser negativo"),
    category: z.string().min(1, "La categoría es obligatoria"),
    available: z.boolean()
});

export const updateServiceSchema = createServiceSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "Debe enviar al menos un campo para actualizar"
    }
);