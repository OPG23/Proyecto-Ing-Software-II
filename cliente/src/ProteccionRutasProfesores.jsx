import { Navigate, Outlet } from "react-router-dom";
import { usoAutenticacion } from "./context/ContextoAutenticacion";

function ProteccionRutasProfesores() {
  const {usuario} = usoAutenticacion();
  
  if (usuario.esEstudiante || usuario.esAdministrador) return <Navigate to="/profile" />;
  return <Outlet />;
}

export default ProteccionRutasProfesores;