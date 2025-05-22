import { Router } from "express";
import profesorController from "../controllers/profesor.controller.js";
import { autentacionRequerida } from "../middlewares/validadorToken.js";

const router = Router();

router.get("/perfil", autentacionRequerida, profesorController.perfilProfesor);
router.put("/actualizar", autentacionRequerida, profesorController.actualizarProfesor);
router.get("/", autentacionRequerida, profesorController.listarProfesores);

export default router;
