import { Navigate, Outlet } from "react-router-dom";
import { usoAutenticacion } from "./context/ContextoAutenticacion";

function ProteccionRutasEstudiantes() {
  const {usuario} = usoAutenticacion();
  
  if (!usuario.esEstudiante) return <Navigate to="/profile" />;
  return <Outlet />;
}

export default ProteccionRutasEstudiantes;