import { createContext, useContext, useState } from "react";
import {
  peticionListarTareas,
  peticionCrearTarea,
  peticionObtenerTarea,
  peticionEditarTarea,
  peticionEliminarTarea,
} from "../api/tarea";
import { toast } from "react-toastify";

export const ContextoTarea = createContext();

export const usoTarea = () => {
  const contexto = useContext(ContextoTarea);
  if (!contexto) throw new Error("usoTarea debe estar en un ProveedorTarea");
  return contexto;
};

export const ProveedorTarea = ({ children }) => {
  const [tareas, setTareas] = useState([]);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(false);

  const listarTareas = async () => {
    setCargando(true);
    try {
      const res = await peticionListarTareas();
      setTareas(res.data);
    } catch (error) {
      toast.error("Error al listar tareas");
    }
    setCargando(false);
  };

  const crearTarea = async (tarea) => {
    try {
      await peticionCrearTarea(tarea);
      toast.success("Tarea creada");
      listarTareas();
    } catch (error) {
      toast.error("Error al crear tarea");
    }
  };

  const obtenerTarea = async (id) => {
    try {
      const res = await peticionObtenerTarea(id);
      setTareaSeleccionada(res.data);
    } catch (error) {
      toast.error("Error al obtener tarea");
    }
  };

  const editarTarea = async (id, tarea) => {
    try {
      await peticionEditarTarea(id, tarea);
      toast.success("Tarea actualizada");
      listarTareas();
    } catch (error) {
      toast.error("Error al editar tarea");
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await peticionEliminarTarea(id);
      toast.success("Tarea eliminada");
      listarTareas();
    } catch (error) {
      toast.error("Error al eliminar tarea");
    }
  };

  return (
    <ContextoTarea.Provider
      value={{
        tareas,
        tareaSeleccionada,
        listarTareas,
        crearTarea,
        obtenerTarea,
        editarTarea,
        eliminarTarea,
        cargando,
      }}
    >
      {children}
    </ContextoTarea.Provider>
  );
};
