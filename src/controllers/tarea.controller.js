import Tarea from "../models/tarea.model.js";

// Crear tarea (profesor)
export const crearTarea = async (req, res) => {
  try {
    const { titulo, descripcion, fechaEntrega, archivos } = req.body;
    const profesor = req.user.id;
    const nuevaTarea = new Tarea({ titulo, descripcion, fechaEntrega, archivos, profesor });
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar tareas (para estudiante: todas, para profesor: solo las suyas)
export const listarTareas = async (req, res) => {
  try {
    let tareas;
    if (req.user.esEstudiante) {
      tareas = await Tarea.find().sort({ fechaEntrega: 1 });
    } else {
      tareas = await Tarea.find({ profesor: req.user.id }).sort({ fechaEntrega: 1 });
    }
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener tarea por ID
export const obtenerTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Editar tarea (profesor)
export const editarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOneAndUpdate(
      { _id: req.params.id, profesor: req.user.id },
      req.body,
      { new: true }
    );
    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar tarea (profesor)
export const eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOneAndDelete({ _id: req.params.id, profesor: req.user.id });
    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
