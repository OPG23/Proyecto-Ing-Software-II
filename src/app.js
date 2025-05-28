import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import rutasAutenticar from "./routes/autenticar.routes.js";
import rutasTarea from "./routes/tarea.routes.js";
import rutasEntrega from "./routes/entrega.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", rutasAutenticar);
app.use("/api/tareas", rutasTarea);
app.use("/api/entregas", rutasEntrega);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


export default app;
