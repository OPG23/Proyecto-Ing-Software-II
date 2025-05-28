import Entrega from "../models/entrega.model.js";

// Entregar tarea (estudiante)
export const entregarTarea = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const tareaId = req.body.tarea;
    const comentario = req.body.comentario;
    const estudiante = req.user.id;
    const archivo = req.file ? req.file.filename : "";

    if (!tareaId) {
      return res.status(400).json({ message: "Falta el campo 'tarea'" });
    }

    const nuevaEntrega = new Entrega({
      tarea: tareaId,
      estudiante,
      comentario,
      archivo,
    });

    await nuevaEntrega.save();
    res.status(201).json(nuevaEntrega);
  } catch (error) {
    console.error("ERROR al guardar entrega:", error.message);
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
