import { usoAutenticacion } from "../context/ContextoAutenticacion";
import { useNavigate } from "react-router-dom";

function paginaPerfil() {
  const navigate = useNavigate();
  const { usuario } = usoAutenticacion();
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-18">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
        Bienvenido { usuario.nombres + " " + usuario.apellidos}
      </h1>
      <button className="bg-[#157347] rounded-md my-2 py-1 px-4 cursor-pointer text-white mt-3" onClick={() =>{
        if(usuario.esEstudiante){
          navigate("/lista_tareas")
        }
        else{
          navigate("/tareas_profesor")
        }
      }}>Ver lista de tareas</button>
    </div>
  );
}

export default paginaPerfil;
