import mongoose from "mongoose";

const schemaEntrega = new mongoose.Schema(
  {
    tarea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tarea",
      required: true,
    },
    estudiante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    archivo: {
      type: String, // URL o nombre de archivo
      required: false,
    },
    comentario: {
      type: String,
      required: false,
    },
    calificacion: {
      type: Number,
      required: false,
    },
    retroalimentacion: {
      type: String,
      required: false,
    },
    fechaEntrega: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Entrega", schemaEntrega);