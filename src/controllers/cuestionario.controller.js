import Cuestionario from "../models/Cuestionario.js";
import RespuestaCuestionario from "../models/RespuestaCuestionario.js";

export const crearCuestionario = async (req, res) => {
  try {
    const cuestionario = new Cuestionario({
      ...req.body,
      creadoPor: req.user.id,
    });
    await cuestionario.save();
    res.status(201).json({ mensaje: "Cuestionario creado exitosamente" });
  } catch (error) {
    console.error("Error al crear cuestionario:", error);
    res.status(500).json({
      error: "Error al crear el cuestionario",
      detalle: error.message,
    });
  }
};

export const obtenerCuestionariosDelProfesor = async (req, res) => {
  try {
    const cuestionarios = await Cuestionario.find({ creadoPor: req.user.id })
      .select("-__v")
      .populate("creadoPor", "nombres apellidos");

    res.json(cuestionarios);
  } catch (error) {
    console.error("Error al obtener cuestionarios del profesor:", error);
    res.status(500).json({ error: "Error al obtener cuestionarios del profesor" });
  }
};

export const obtenerCuestionarios = async (req, res) => {
  try {
    const cuestionarios = await Cuestionario.find()
      .select("-__v")
      .populate("creadoPor", "nombres apellidos");
    res.json(cuestionarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener cuestionarios" });
  }
};

export const responderCuestionario = async (req, res) => {
  try {
    const { cuestionarioId, respuestas } = req.body;

    const yaRespondido = await RespuestaCuestionario.findOne({
      cuestionarioId,
      estudianteId: req.user.id,
    });

    if (yaRespondido) {
      return res.status(400).json({ error: "Ya respondiste este cuestionario" });
    }

    const cuestionario = await Cuestionario.findById(cuestionarioId);
    if (!cuestionario) {
      return res.status(404).json({ error: "Cuestionario no encontrado" });
    }

    let correctas = 0;
    let totalAutoevaluables = 0;
    let tieneAbiertas = false;

    cuestionario.preguntas.forEach((p) => {
      const respuesta = respuestas.find((r) => r.preguntaId === String(p._id));
      if (!respuesta) return;
      if (p.tipo === "abierta") {
        tieneAbiertas = true;
        return;
      }
      totalAutoevaluables++;
      if (respuesta.respuesta === p.respuestaCorrecta) {
        correctas++;
      }
    });

    let nota = null;
      if (!tieneAbiertas && totalAutoevaluables > 0) {
        const porcentaje = correctas / totalAutoevaluables;
        nota = parseFloat((5 * porcentaje).toFixed(2)); 
      }

    const nuevaRespuesta = new RespuestaCuestionario({
      cuestionarioId,
      estudianteId: req.user.id,
      respuestas,
      nota,
    });

    await nuevaRespuesta.save();
    res.status(201).json({ mensaje: "Respuestas guardadas correctamente", nota });
  } catch (error) {
    console.error("Error al responder cuestionario:", error);
    res.status(500).json({ error: "Error al responder cuestionario", detalle: error.message });
  }
};

export const obtenerRespuestasPorCuestionario = async (req, res) => {
  try {
    const { id } = req.params; // ID del cuestionario

    const respuestas = await RespuestaCuestionario.find({ cuestionarioId: id })
      .populate("estudianteId", "nombres apellidos")
      .populate("cuestionarioId", "titulo preguntas");

    res.json(respuestas);
  } catch (error) {
    console.error("Error al obtener respuestas:", error);
    res.status(500).json({ error: "Error al obtener respuestas" });
  }
};

export const obtenerRespuestaPorId = async (req, res) => {
  try {
    const respuesta = await RespuestaCuestionario.findById(req.params.id)
      .populate("estudianteId", "nombres apellidos")
      .populate("cuestionarioId");

    if (!respuesta) return res.status(404).json({ error: "Respuesta no encontrada" });
    res.json(respuesta);
  } catch (error) {
    console.error("Error al obtener respuesta individual:", error);
    res.status(500).json({ error: "Error al obtener respuesta" });
  }
};

export const calificarRespuesta = async (req, res) => {
  try {
    const { nota } = req.body;

    if (typeof nota !== "number" || isNaN(nota)) {
      return res.status(400).json({ error: "La nota debe ser un número válido" });
    }

    const respuesta = await RespuestaCuestionario.findByIdAndUpdate(
      req.params.id,
      { nota },
      { new: true }
    );

    if (!respuesta) return res.status(404).json({ error: "Respuesta no encontrada" });

    res.json({ mensaje: "Nota actualizada", nota: respuesta.nota });
  } catch (error) {
    console.error("Error al calificar respuesta:", error);
    res.status(500).json({ error: "Error al calificar respuesta", detalle: error.message });
  }
};
