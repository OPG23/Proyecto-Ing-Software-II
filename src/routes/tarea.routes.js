import { Router } from "express";
import {
  crearTarea,
  listarTareas,
  obtenerTarea,
  editarTarea,
  eliminarTarea,
} from "../controllers/tarea.controller.js";
import { autentacionRequerida } from "../middlewares/validadorToken.js";

const router = Router();

// Listar tareas (profesor y estudiante)
router.get("/", autentacionRequerida, listarTareas);

// Crear tarea (solo profesor)
router.post("/", autentacionRequerida, crearTarea);

// Obtener tarea por id
router.get("/:id", autentacionRequerida, obtenerTarea);

// Editar tarea (solo profesor)
router.put("/:id", autentacionRequerida, editarTarea);

// Eliminar tarea (solo profesor)
router.delete("/:id", autentacionRequerida, eliminarTarea);

export default router;
