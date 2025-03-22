import { Link } from "react-router-dom";
import { usoAutenticacion } from "../context/ContextoAutenticacion";

function Encabezado() {
  const { estaAutenticado, cerrarSesion } = usoAutenticacion();
  return (
    <div className=" bg-[rgba(231,231,231,0.9)] text-balck text-center py-2 border-2 flex items-center justify-center">
      <img
        src="/logo.svg"
        alt="LogoProyecto"
        className="h-25 ml-5 cursor-pointer"
        onClick={() => navigate("/iniciar-sesion")}
      />
      <h1 className="flex-1 text-5xl font-bold">Plataforma educativa A.A</h1>
      <ul>
        {estaAutenticado ? (
          <div className="bg-[#8b8a8a] rounded-md my-2 py-2 px-4 flex mr-5 bg">
            <Link
              to="/"
              onClick={() => {
                cerrarSesion();
              }}
            >
              Cerrar sesion
            </Link>
          </div>
        ) : (
          <>
            <img
              src="/logo.svg"
              alt="LogoProyecto"
              className="h-25 mr-5 cursor-pointer"
              onClick={() => navigate("/iniciar-sesion")}
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default Encabezado;
