import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true 
    },
    descripcion: {
        type: String 
    },
    profesor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    fechaCreacion: {
        type: Date, 
        default: Date.now
    },
    fechaEntrega: {
        type: Date,
        required: true 
    },
    archivosAdjuntos: [String],
    calificacionMax: {
        type: Number, 
        default: 5.0 
    },
    estado: {
        type: String,
        enum: ['activa', 'cerrada', 'borrador'],
        default: 'activa' 
    },
    visibilidad: {
        type: Boolean,
        default: true 
    },

});

export default mongoose.model("Tarea", tareaSchema)