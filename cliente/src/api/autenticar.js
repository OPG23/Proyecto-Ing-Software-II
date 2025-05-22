import axios from "./axios";

export const peticionRegistro = (usuario) => axios.post(`/registro`, usuario);

export const peticionIniciarSesion = (usuario) => axios.post(`/iniciar-sesion`, usuario)

export const verificarPeticionToken = () => axios.get("/verificar")

// Tareas
export const crearTarea = (data) => axios.post(`/tareas`, data);
export const editarTarea = (id, data) => axios.put(`/tareas/${id}`, data);
export const obtenerTarea = (id) => axios.get(`/tareas/${id}`);
export const listarTareas = (params) => axios.get(`/tareas`);
export const eliminarTarea = (id) => axios.delete(`/tareas/${id}`);

// Entregas
export const crearEntrega = (data) => axios.post(`/entregas`, data);
export const editarEntrega = (id, data) => axios.put(`/entregas/${id}`, data);
export const obtenerEntrega = (id) => axios.get(`/entregas/${id}`);
export const listarEntregas = (params) => axios.get(`/entregas`);

