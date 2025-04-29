import mongoose from "mongoose";

const entregaSchema = new mongoose.Schema({
    tarea: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tarea',
        required: true 
    },
    estudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudiante',
        required: true
    },
    fechaEntrega: {
        type: Date,
        default: Date.now 
    },
    archivoAdjunto: { 
        type: String 
    }, 
    calificacion: {
        type: Number 
    },
    retroalimentacion: {
        type: String },
    estado: {
    type: String,
    enum: ['entregada', 'revisada', 'retrasada', 'faltante'],
    default: 'entregada'
    },
    entregadoTarde: {
        type: Boolean,
        default: false 
    },
    visibilidadNota: {
        type: Boolean,
        default: true 
    }


})

export default mongoose.model("Entrega", entregaSchema)