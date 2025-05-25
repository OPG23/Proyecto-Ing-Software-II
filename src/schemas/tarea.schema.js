import { z } from "zod";

export const esquemaCrearTarea = z.object({
  titulo: z.string({
    required_error: "El título es requerido",
  }),
  descripcion: z.string({
    required_error: "La descripción es requerida",
  }),
  fechaEntrega: z.string({
    required_error: "La fecha de entrega es requerida",
  }),
  archivos: z.array(z.string()).optional(),
});

export const esquemaEditarTarea = z.object({
  titulo: z.string().optional(),
  descripcion: z.string().optional(),
  fechaEntrega: z.string().optional(),
  archivos: z.array(z.string()).optional(),
});
