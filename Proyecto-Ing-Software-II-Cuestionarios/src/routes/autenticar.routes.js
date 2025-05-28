import { crearCuestionario } from "../controllers/cuestionario.controller.js";
import { obtenerCuestionariosDelProfesor } from "../controllers/cuestionario.controller.js";
import { obtenerCuestionarios } from "../controllers/cuestionario.controller.js";
import { responderCuestionario } from "../controllers/cuestionario.controller.js";
import {
  obtenerRespuestasPorCuestionario,
  obtenerRespuestaPorId,
  calificarRespuesta,
} from "../controllers/cuestionario.controller.js";

import { Router } from "express";
import {
  registro,
  iniciarSesion,
  cerrarSesion,
  profile,
  verificarToken,
} from "../controllers/autenticar.controller.js";
import { autentacionRequerida } from "../middlewares/validadorToken.js";
import { esAdministrador } from "../middlewares/validadorAdministrador.js";
const router = Router();
import { validadorEsquema } from "../middlewares/validador.middleware.js";
import {
  esquemaInicioSesion,
  esquemaRegistro,
} from "../schemas/autenticar.schema.js";

router.post(
  "/registro",
  autentacionRequerida,
  esAdministrador,
  validadorEsquema(esquemaRegistro),
  registro
);

router.post(
  "/iniciar-sesion",
  validadorEsquema(esquemaInicioSesion),
  iniciarSesion
);

router.post("/cerrar-sesion", cerrarSesion);

router.get("/verificar", verificarToken);

router.get("/perfil", autentacionRequerida, profile);

router.post("/cuestionarios", autentacionRequerida, crearCuestionario);

router.get("/mis-cuestionarios", autentacionRequerida, obtenerCuestionariosDelProfesor);

router.get("/cuestionarios", autentacionRequerida, obtenerCuestionarios);

router.post("/responder-cuestionario", autentacionRequerida, responderCuestionario);

router.get("/respuestas/:id", autentacionRequerida, obtenerRespuestasPorCuestionario);

router.get("/respuesta/:id", autentacionRequerida, obtenerRespuestaPorId);

router.put("/respuesta/:id/calificar", autentacionRequerida, calificarRespuesta);

export default router;
