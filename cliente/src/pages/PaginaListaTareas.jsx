import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { usoTarea } from "../context/ContextoTarea";

function PaginaListaTareas() {
  const navigate = useNavigate();
  const { tareas, listarTareas, cargando } = usoTarea();

  useEffect(() => {
    listarTareas();
  }, []);

  const Entregar = (id) => {
    navigate(`/entregar_tarea?id=${id}`);
  };

  return (
    <div className="flex h-full items-center justify-center my-16">
      <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid">
        <h1 className="text-2xl font-bold text-center">Lista de Tareas</h1>
        <ul className="mx-4 ">
          {cargando ? (
            <li className="text-center my-4">Cargando...</li>
          ) : tareas.length === 0 ? (
            <li className="text-center my-4">No hay tareas disponibles.</li>
          ) : (
            tareas.map((tarea) => (
              <li
                key={tarea._id}
                className="rounded-2xl border-2 border-gray-400 text-center my-4 py-1 space-y-2"
              >
                <h2 className="text-2xl font-bold text-center">
                  {tarea.titulo}
                </h2>
                <p>{tarea.descripcion}</p>
                <button
                  className="bg-[#157347] rounded-md my-2 py-1 px-4 cursor-pointer text-white"
                  onClick={() => Entregar(tarea._id)}
                >
                  Entregar tarea
                </button>
              </li>
            ))
          )}
        </ul>
        <div className="w-full flex items-center justify-center">
          <Link
            to="/"
            className="bg-[#8b8a8a] flex items-center justify-center w-25 mb-4 rounded-md px-4 py-1 text-sm sm:text-xl sm:px-5 sm:py-1 border-1 cursor-pointer"
          >
            Atrás
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaginaListaTareas;
