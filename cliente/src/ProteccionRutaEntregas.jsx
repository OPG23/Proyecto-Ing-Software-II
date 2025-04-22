import { Navigate, Outlet } from "react-router-dom";
import { usoAutenticacion } from "./context/ContextoAutenticacion";

function ProteccionRutaEntregas() {
  const {usuario} = usoAutenticacion();


  //if (usuario.esAdministrador) return <Navigate to="/registro" />;
  return <Outlet />;
}

export default ProteccionRutaEntregas;