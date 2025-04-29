import Cuestionario from "../models/Cuestionario.js";

export const crearCuestionario = async (req, res) => {
  try {
    const cuestionario = new Cuestionario({ ...req.body, creadoPor: req.usuario.id });
    await cuestionario.save();
    res.status(201).json({ mensaje: "Cuestionario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el cuestionario" });
  }
};
