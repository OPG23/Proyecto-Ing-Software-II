import { usoAutenticacion } from "../context/ContextoAutenticacion";
import { useNavigate } from "react-router-dom";

function PaginaPerfil() {
  const { usuario } = usoAutenticacion();
  const navigate = useNavigate();

  const irACrearCuestionario = () => {
    navigate("/cuestionarios");
  };

  const irAVerListaTareas = () => {
    if (usuario.esEstudiante) {
      navigate("/lista_tareas");
    } else {
      navigate("/tareas_profesor");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-18">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-6">
        Bienvenido {usuario.nombres + " " + usuario.apellidos}
      </h1>

      {/* Botones de cuestionarios para profesores */}
      {!usuario?.esEstudiante && (
        <>
          <button
            onClick={irACrearCuestionario}
            className="bg-[#8b8a8a] rounded-md my-2 py-2 px-4 cursor-pointer"
          >
            Crear Cuestionario
          </button>

          <button
            onClick={() => navigate("/mis-cuestionarios")}
            className="bg-[#8b8a8a] rounded-md my-2 py-2 px-4 cursor-pointer"
          >
            Ver Mis Cuestionarios
          </button>
        </>
      )}

      {/* Botón para ver cuestionarios (estudiantes) */}
      {usuario?.esEstudiante && (
        <button
          onClick={() => navigate("/ver-cuestionarios")}
          className="bg-[#8b8a8a] rounded-md my-2 py-2 px-4 cursor-pointer"
        >
          Ver Cuestionarios
        </button>
      )}

      {/* Botón para ver lista de tareas (profesores o estudiantes) */}
      <button
        className="bg-[#157347] rounded-md my-2 py-2 px-4 cursor-pointer text-white mt-3"
        onClick={irAVerListaTareas}
      >
        Ver lista de tareas
      </button>
    </div>
  );
}

export default PaginaPerfil;
