import mongoose from "mongoose";

const schemaTarea = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    fechaEntrega: {
      type: Date,
      required: true,
    },
    profesor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    archivos: [
      {
        type: String, // URL o nombre de archivo
        required: false,
      }
    ],
    // Puedes agregar más campos según necesidades
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tarea", schemaTarea);