import app from "./app.js";
import { connectDB } from "./db.js";
import { hayAdministrador } from "./create-admin.js";
import tareaRoutes from "./routes/tarea.routes.js";

connectDB();
hayAdministrador();
app.use("/tareas", tareaRoutes);
app.listen(4000);
console.log("Server on port", 4000);

