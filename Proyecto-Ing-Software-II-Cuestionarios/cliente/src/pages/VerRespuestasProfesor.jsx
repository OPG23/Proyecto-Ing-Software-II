import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function VerRespuestasProfesor() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    const fetchRespuestas = async () => {
      const res = await axios.get(`http://localhost:4000/api/respuestas/${id}`, {
        withCredentials: true,
      });
      setRespuestas(res.data);
    };
    fetchRespuestas();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-[rgba(231,231,231,0.9)] rounded-lg shadow-lg p-6 border-2">
      <h1 className="text-2xl font-bold mb-4 text-center">Respuestas al Cuestionario</h1>
      {respuestas.length === 0 && <p>No hay respuestas aún.</p>}
      {respuestas.map((r) => (
        <div key={r._id} className="border p-4 rounded-lg mb-4 bg-white shadow">
          <p className="font-semibold">Estudiante: {r.estudianteId.nombres} {r.estudianteId.apellidos}</p>
          <p className="text-gray-600">Nota: {r.nota ?? "Pendiente"}</p>
          <button
            className="mt-2 px-4 py-2 bg-[#8b8a8a] text-white rounded-md"
            onClick={() => navigate(`/evaluar-respuesta/${r._id}`)}
          >
            Evaluar Respuestas
          </button>
        </div>
      ))}
    </div>
  );
}

export default VerRespuestasProfesor;