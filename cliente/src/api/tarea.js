import axios from "./axios";

// Listar tareas
export const peticionListarTareas = () => axios.get("/tareas");

// Crear tarea
export const peticionCrearTarea = (tarea) => axios.post("/tareas", tarea);

// Obtener tarea por id
export const peticionObtenerTarea = (id) => axios.get(`/tareas/${id}`);

// Editar tarea
export const peticionEditarTarea = (id, tarea) => axios.put(`/tareas/${id}`, tarea);

// Eliminar tarea
export const peticionEliminarTarea = (id) => axios.delete(`/tareas/${id}`);
