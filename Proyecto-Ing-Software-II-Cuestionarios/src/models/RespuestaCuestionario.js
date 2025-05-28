import mongoose from "mongoose";

const respuestaPreguntaSchema = new mongoose.Schema({
  preguntaId: { type: mongoose.Schema.Types.ObjectId, required: true },
  respuesta: { type: String, required: true },
});

const respuestaCuestionarioSchema = new mongoose.Schema({
  cuestionarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cuestionario",
    required: true,
  },
  estudianteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  respuestas: [respuestaPreguntaSchema],
  nota: { type: Number, default: null },
  fechaRespuesta: { type: Date, default: Date.now },
});

export default mongoose.model("RespuestaCuestionario", respuestaCuestionarioSchema);