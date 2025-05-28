import { Router } from "express";
import {
  entregarTarea,
  listarEntregasPorTarea,
  obtenerEntregaEstudiante,
  calificarEntrega,
} from "../controllers/entrega.controller.js";

import { autentacionRequerida } from "../middlewares/validadorToken.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

// Entregar tarea (estudiante)
router.post("/", autentacionRequerida, upload.single("archivo"), entregarTarea);

// Listar entregas de una tarea (profesor)
router.get("/tarea/:tareaId", autentacionRequerida, listarEntregasPorTarea);

// Obtener entrega de un estudiante para una tarea
router.get("/mi-entrega/:tareaId", autentacionRequerida, obtenerEntregaEstudiante);

// Calificar entrega (profesor)
router.put("/:entregaId/calificar", autentacionRequerida, calificarEntrega);

export default router;
