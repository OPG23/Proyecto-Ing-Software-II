import mongoose from "mongoose";

const preguntaSchema = new mongoose.Schema({
  enunciado: { type: String, required: true },
  tipo: { type: String, enum: ["seleccion", "abierta", "verdaderoFalso"], required: true },
  opciones: [String], // solo para selección múltiple o verdadero/falso
  respuestaCorrecta: String, // opcional en preguntas abiertas
});

const cuestionarioSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  preguntas: [preguntaSchema],
  creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  fechaCreacion: { type: Date, default: Date.now },
});

export default mongoose.model("Cuestionario", cuestionarioSchema);
