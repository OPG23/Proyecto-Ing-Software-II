import axios from "./axios";

export const peticionRegistro = (usuario) => axios.post(`/registro`, usuario);

export const peticionIniciarSesion = (usuario) => axios.post(`/iniciar-sesion`, usuario)

export const verificarPeticionToken = () => axios.get("/verificar")

// Esta funcion es para verificar si el token es valido y si el usuario existe PARA el restablecimiento de contraseña
//mirar si es post o get
export const peticionRestablecerContrasena = (usuario) => axios.post(`/restablecer-contrasena`, usuario)