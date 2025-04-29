import mongoose from "mongoose";

const estudianteSchema = new mongoose.Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "Usuario"
    },
    grado_academico:{
        type: String,
        trim: true
    },
    carrera:{
        type: String,
        trim: true
    },
    notas_por_profesor: {
        type: Map,
        of: Number
    },
    promedio_general: { 
        type: Number 
    }
});

export default mongoose.model("Estudiante", estudianteSchema)