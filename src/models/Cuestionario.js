import mongoose from "mongoose";

const preguntaSchema = new mongoose.Schema({
  enunciado: { type: String, required: true },
  tipo: { type: String, enum: ["seleccion", "abierta"], required: true },
  opciones: [String],
  respuestaCorrecta: String,
});

const cuestionarioSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  preguntas: [preguntaSchema],
  creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  fechaCreacion: { type: Date, default: Date.now },
});

export default mongoose.model("Cuestionario", cuestionarioSchema);