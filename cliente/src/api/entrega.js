import axios from "./axios";

// Entregar tarea (estudiante)
export const peticionEntregarTarea = (entrega) => axios.post("/entregas", entrega);

// Listar entregas de una tarea (profesor)
export const peticionListarEntregasPorTarea = (tareaId) => axios.get(`/entregas/tarea/${tareaId}`);

// Obtener entrega de un estudiante para una tarea
export const peticionObtenerMiEntrega = (tareaId) => axios.get(`/entregas/mi-entrega/${tareaId}`);

// Calificar entrega (profesor)
export const peticionCalificarEntrega = (entregaId, datos) => axios.put(`/entregas/${entregaId}/calificar`, datos);
