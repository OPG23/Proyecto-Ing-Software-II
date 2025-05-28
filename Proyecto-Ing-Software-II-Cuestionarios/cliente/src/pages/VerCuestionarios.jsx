import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerCuestionarios() {
  const [cuestionarios, setCuestionarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCuestionarios = async () => {
      const res = await axios.get("http://localhost:4000/api/cuestionarios", {
        withCredentials: true,
      });
      setCuestionarios(res.data);
    };
    obtenerCuestionarios();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-[rgba(231,231,231,0.9)] rounded-lg shadow-lg p-6 border-2">
      <h1 className="text-2xl font-bold mb-6 text-center">Cuestionarios disponibles</h1>
      {cuestionarios.length === 0 && <p className="text-center">No hay cuestionarios disponibles.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cuestionarios.map((c) => (
          <div key={c._id} className="border p-4 rounded-lg bg-white shadow hover:shadow-lg transition duration-300">
            <h2 className="text-lg font-semibold mb-1">{c.titulo}</h2>
            <p className="mb-1">{c.descripcion}</p>
            <p className="text-sm text-gray-600 mb-3">
              Profesor: {c.creadoPor?.nombres} {c.creadoPor?.apellidos}
            </p>
            <button
              className="px-4 py-2 bg-[#8b8a8a] text-white rounded-md w-full"
              onClick={() => navigate(`/responder-cuestionario/${c._id}`)}
            >
              Responder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerCuestionarios;