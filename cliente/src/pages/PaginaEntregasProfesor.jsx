import { useEffect, useState } from "react";
import { usoEntrega } from "../context/ContextoEntrega";
import { useSearchParams, useNavigate } from "react-router-dom";

function PaginaEntregasProfesor() {
  const { entregas, listarEntregasPorTarea, calificarEntrega } = usoEntrega();
  const [params] = useSearchParams();
  const tareaId = params.get("id");
  const navigate = useNavigate();

  const [notas, setNotas] = useState({});

  useEffect(() => {
    if (tareaId) listarEntregasPorTarea(tareaId);
  }, [tareaId]);

  const handleNotaChange = (id, campo, valor) => {
    setNotas((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [campo]: valor,
      },
    }));
  };

  const guardarNota = async (id) => {
    const datos = notas[id];
    if (!datos || datos.calificacion === undefined) {
      alert("Por favor ingresa una calificación válida.");
      return;
    }

    await calificarEntrega(id, datos);
    listarEntregasPorTarea(tareaId);
  };

  return (
    <div className="flex h-full items-center justify-center my-16">
      <div className="bg-[rgba(231,231,231,0.9)] max-w-3xl w-full pt-5 rounded-4xl border-2 border-solid p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Entregas de la Tarea</h1>

        {entregas.length === 0 ? (
          <p className="text-center">No hay entregas para esta tarea.</p>
        ) : (
          entregas.map((entrega) => (
            <div
              key={entrega._id}
              className="rounded-2xl border-2 border-gray-400 text-left py-4 px-4 space-y-2  mb-6"
            >
              <p><strong>Estudiante:</strong> {entrega.estudiante?.nombres} {entrega.estudiante?.apellidos}</p>
              <p><strong>Comentario:</strong> {entrega.comentario || "Ninguno"}</p>
              <p><strong>Fecha:</strong> {new Date(entrega.fechaEntrega).toLocaleString()}</p>
              <p>
                <strong>Archivo:</strong>{" "}
                {entrega.archivo ? (
                  <a
                    href={`http://localhost:4000/uploads/${entrega.archivo}`}
                    download
                    className="text-blue-600 underline"
                  >
                    Descargar archivo
                  </a>
                ) : (
                  "Ninguno"
                )}
              </p>
              <p><strong>Calificación actual:</strong> {entrega.calificacion ?? "Sin calificar"}</p>

              <div className="mt-3 space-y-2">
                <input
                  type="number"
                  min={1}
                  max={5}
                  step={0.1}
                  placeholder="Nota (1-5)"
                  className="w-full border rounded px-2 py-1"
                  onChange={(e) => handleNotaChange(entrega._id, "calificacion", parseFloat(e.target.value))}
                />
                <textarea
                  placeholder="Retroalimentación (opcional)"
                  className="w-full border rounded px-2 py-1"
                  onChange={(e) => handleNotaChange(entrega._id, "retroalimentacion", e.target.value)}
                />
                <div className="text-center">
                  <button
                  className="bg-[#157347] rounded-md my-2 py-1 px-4 cursor-pointer text-white"
                  onClick={() => guardarNota(entrega._id)}
                >
                  Guardar nota
                </button>
                  </div>
                
              </div>
            </div>
          ))
        )}

        <div className="text-center">
          <button
            className="bg-[#8b8a8a] text-black rounded-md my-1 py-1 px-1 w-35 cursor-pointer"
            onClick={() => navigate("/tareas_profesor")}
          >
            Volver a tareas asignadas
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaginaEntregasProfesor;
