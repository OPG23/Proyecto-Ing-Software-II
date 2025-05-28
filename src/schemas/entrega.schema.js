import { z } from "zod";

export const esquemaEntregarTarea = z.object({
  tarea: z.string({
    required_error: "El ID de la tarea es requerido",
  }),
  archivo: z.string().optional(),
  comentario: z.string().optional(),
});

export const esquemaCalificarEntrega = z.object({
  calificacion: z.number({
    required_error: "La calificación es requerida",
  }),
  retroalimentacion: z.string().optional(),
});
