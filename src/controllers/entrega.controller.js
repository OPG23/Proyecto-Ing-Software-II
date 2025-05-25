import Entrega from "../models/entrega.model.js";

// Entregar tarea (estudiante)
export const entregarTarea = async (req, res) => {
  try {
    const { tarea, archivo, comentario } = req.body;
    const estudiante = req.user.id;
    const nuevaEntrega = new Entrega({ tarea, estudiante, archivo, comentario });
    await nuevaEntrega.save();
    res.status(201).json(nuevaEntrega);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar entregas de una tarea (profesor)
export const listarEntregasPorTarea = async (req, res) => {
  try {
    const entregas = await Entrega.find({ tarea: req.params.tareaId }).populate("estudiante", "nombres apellidos correo");
    res.json(entregas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener entrega de un estudiante para una tarea
export const obtenerEntregaEstudiante = async (req, res) => {
  try {
    const entrega = await Entrega.findOne({ tarea: req.params.tareaId, estudiante: req.user.id });
    if (!entrega) return res.status(404).json({ message: "Entrega no encontrada" });
    res.json(entrega);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Calificar entrega (profesor)
export const calificarEntrega = async (req, res) => {
  try {
    const { calificacion, retroalimentacion } = req.body;
    const entrega = await Entrega.findByIdAndUpdate(
      req.params.entregaId,
      { calificacion, retroalimentacion },
      { new: true }
    );
    if (!entrega) return res.status(404).json({ message: "Entrega no encontrada" });
    res.json(entrega);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
