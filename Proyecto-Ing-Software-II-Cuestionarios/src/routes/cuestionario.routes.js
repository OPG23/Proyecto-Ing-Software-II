import { Router } from "express";
import { crearCuestionario } from "../controllers/cuestionario.controller.js";
import { autentacionRequerida } from "../middlewares/validadorToken.js"; 

const router = Router();

router.post("/", autentacionRequerida, crearCuestionario); 
export default router;
