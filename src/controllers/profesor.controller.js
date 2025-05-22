import Profesor from "../models/profesor.model.js";

// Obtener perfil de profesor por usuario
const perfilProfesor = async (req, res) => {
    try {
        const profesor = await Profesor.findOne({ usuario: req.usuario._id }).populate("usuario");
        if (!profesor) return res.status(404).json({ msg: "Profesor no encontrado" });
        res.json(profesor);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener el perfil" });
    }
};

// Actualizar datos del profesor
const actualizarProfesor = async (req, res) => {
    try {
        const profesor = await Profesor.findOneAndUpdate(
            { usuario: req.usuario._id },
            req.body,
            { new: true }
        );
        if (!profesor) return res.status(404).json({ msg: "Profesor no encontrado" });
        res.json(profesor);
    } catch (error) {
        res.status(400).json({ msg: "Error al actualizar profesor" });
    }
};

// Listar todos los profesores (para administración)
const listarProfesores = async (req, res) => {
    try {
        const profesores = await Profesor.find().populate("usuario");
        res.json(profesores);
    } catch (error) {
        res.status(500).json({ msg: "Error al listar profesores" });
    }
};

export default {
    perfilProfesor,
    actualizarProfesor,
    listarProfesores
};
