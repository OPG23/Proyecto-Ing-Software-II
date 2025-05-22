import { Router } from "express";
import entregaController from "../controllers/entrega.controller.js";
import { autentacionRequerida } from "../middlewares/validadorToken.js";

const router = Router();

router.post("/", autentacionRequerida, entregaController.crearEntrega);
router.put("/:id", autentacionRequerida, entregaController.editarEntrega);
router.get("/:id", autentacionRequerida, entregaController.obtenerEntrega);
router.get("/", autentacionRequerida, entregaController.listarEntregas);

export default router;
