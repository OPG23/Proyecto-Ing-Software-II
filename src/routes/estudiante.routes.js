import { Router } from "express";
import estudianteController from "../controllers/estudiante.controller.js";
import { autentacionRequerida } from "../middlewares/validadorToken.js";

const router = Router();

router.get("/perfil", autentacionRequerida, estudianteController.perfilEstudiante);
router.put("/actualizar", autentacionRequerida, estudianteController.actualizarEstudiante);
router.get("/", autentacionRequerida, estudianteController.listarEstudiantes);

export default router;
