import mongoose from "mongoose"
import { Schema } from "zod"

const ProfesorSchema = new mongoose.Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "Usuario"
    },
    facultad:{
        type: String,
        trim: true
    },
    grado_academico:{
        type: String,
        trim: true
    },
    horario_atencion:{
        type: Map,
        of: [Date]
    }
})

export default mongoose.model("Profesor", ProfesorSchema)

