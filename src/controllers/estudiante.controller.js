import Estudiante from "../models/estudiante.model.js";

// Obtener perfil de estudiante por usuario
const perfilEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findOne({ usuario: req.usuario._id }).populate("usuario");
        if (!estudiante) return res.status(404).json({ msg: "Estudiante no encontrado" });
        res.json(estudiante);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener el perfil" });
    }
};

// Actualizar datos del estudiante
const actualizarEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findOneAndUpdate(
            { usuario: req.usuario._id },
            req.body,
            { new: true }
        );
        if (!estudiante) return res.status(404).json({ msg: "Estudiante no encontrado" });
        res.json(estudiante);
    } catch (error) {
        res.status(400).json({ msg: "Error al actualizar estudiante" });
    }
};

// Listar todos los estudiantes (para administración)
const listarEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find().populate("usuario");
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ msg: "Error al listar estudiantes" });
    }
};

export default {
    perfilEstudiante,
    actualizarEstudiante,
    listarEstudiantes
};
