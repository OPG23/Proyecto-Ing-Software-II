import { Router } from "express";
import tareaController from "../controllers/tarea.controller.js";
import { autentacionRequerida } from "../middlewares/validadorToken.js";

const router = Router();


router.post("/", autentacionRequerida, tareaController.crearTarea);
router.put("/:id", autentacionRequerida, tareaController.editarTarea);
router.get("/:id", autentacionRequerida, tareaController.obtenerTarea);
router.get("/", autentacionRequerida, tareaController.listarTareas);
router.delete("/:id", autentacionRequerida, tareaController.eliminarTarea);

export default router;
