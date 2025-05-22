import Tarea from "../models/tarea.model.js";

// Crear tarea
const crearTarea = async (req, res) => {
    try {
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.status(201).json(tarea);
    } catch (error) {
        res.status(400).json({ msg: "Error al crear tarea" });
    }
};

// Editar tarea
const editarTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tarea) return res.status(404).json({ msg: "Tarea no encontrada" });
        res.json(tarea);
    } catch (error) {
        res.status(400).json({ msg: "Error al editar tarea" });
    }
};

// Obtener tarea por ID
const obtenerTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) return res.status(404).json({ msg: "Tarea no encontrada" });
        res.json(tarea);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener tarea" });
    }
};

// Listar tareas (por profesor o todas)
const listarTareas = async (req, res) => {
    try {
        const filtro = req.query.profesor ? { profesor: req.query.profesor } : {};
        const tareas = await Tarea.find(filtro);
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ msg: "Error al listar tareas" });
    }
};

// Eliminar tarea
const eliminarTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndDelete(req.params.id);
        if (!tarea) return res.status(404).json({ msg: "Tarea no encontrada" });
        res.json({ msg: "Tarea eliminada" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar tarea" });
    }
};

export default {
    crearTarea,
    editarTarea,
    obtenerTarea,
    listarTareas,
    eliminarTarea
};
