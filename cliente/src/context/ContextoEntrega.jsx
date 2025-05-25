import { createContext, useContext, useState } from "react";
import {
  peticionEntregarTarea,
  peticionListarEntregasPorTarea,
  peticionObtenerMiEntrega,
  peticionCalificarEntrega,
} from "../api/entrega";
import { toast } from "react-toastify";

export const ContextoEntrega = createContext();

export const usoEntrega = () => {
  const contexto = useContext(ContextoEntrega);
  if (!contexto) throw new Error("usoEntrega debe estar en un ProveedorEntrega");
  return contexto;
};

export const ProveedorEntrega = ({ children }) => {
  const [entregas, setEntregas] = useState([]);
  const [miEntrega, setMiEntrega] = useState(null);
  const [cargando, setCargando] = useState(false);

  const entregarTarea = async (entrega) => {
    try {
      await peticionEntregarTarea(entrega);
      toast.success("Tarea entregada");
    } catch (error) {
      toast.error("Error al entregar tarea");
    }
  };

  const listarEntregasPorTarea = async (tareaId) => {
    setCargando(true);
    try {
      const res = await peticionListarEntregasPorTarea(tareaId);
      setEntregas(res.data);
    } catch (error) {
      toast.error("Error al listar entregas");
    }
    setCargando(false);
  };

  const obtenerMiEntrega = async (tareaId) => {
    try {
      const res = await peticionObtenerMiEntrega(tareaId);
      setMiEntrega(res.data);
    } catch (error) {
      toast.error("Error al obtener mi entrega");
    }
  };

  const calificarEntrega = async (entregaId, datos) => {
    try {
      await peticionCalificarEntrega(entregaId, datos);
      toast.success("Entrega calificada");
    } catch (error) {
      toast.error("Error al calificar entrega");
    }
  };

  return (
    <ContextoEntrega.Provider
      value={{
        entregas,
        miEntrega,
        entregarTarea,
        listarEntregasPorTarea,
        obtenerMiEntrega,
        calificarEntrega,
        cargando,
      }}
    >
      {children}
    </ContextoEntrega.Provider>
  );
};
