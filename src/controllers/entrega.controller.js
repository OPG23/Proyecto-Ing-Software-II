import Entrega from "../models/entrega.model.js";

// Crear entrega
const crearEntrega = async (req, res) => {
    try {
        const entrega = new Entrega(req.body);
        await entrega.save();
        res.status(201).json(entrega);
    } catch (error) {
        res.status(400).json({ msg: "Error al crear entrega" });
    }
};

// Editar entrega (por ejemplo, calificar)
const editarEntrega = async (req, res) => {
    try {
        const entrega = await Entrega.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!entrega) return res.status(404).json({ msg: "Entrega no encontrada" });
        res.json(entrega);
    } catch (error) {
        res.status(400).json({ msg: "Error al editar entrega" });
    }
};

// Obtener entrega por ID
const obtenerEntrega = async (req, res) => {
    try {
        const entrega = await Entrega.findById(req.params.id);
        if (!entrega) return res.status(404).json({ msg: "Entrega no encontrada" });
        res.json(entrega);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener entrega" });
    }
};

// Listar entregas (por tarea, estudiante, etc.)
const listarEntregas = async (req, res) => {
    try {
        const filtro = {};
        if (req.query.tarea) filtro.tarea = req.query.tarea;
        if (req.query.estudiante) filtro.estudiante = req.query.estudiante;
        const entregas = await Entrega.find(filtro);
        res.json(entregas);
    } catch (error) {
        res.status(500).json({ msg: "Error al listar entregas" });
    }
};

export default {
    crearEntrega,
    editarEntrega,
    obtenerEntrega,
    listarEntregas
};
