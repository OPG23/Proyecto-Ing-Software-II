import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResponderCuestionario() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [cuestionario, setCuestionario] = useState(null);
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    const cargarCuestionario = async () => {
      const res = await axios.get("http://localhost:4000/api/cuestionarios", {
        withCredentials: true,
      });

      const encontrado = res.data.find((c) => c._id === id);
      if (encontrado) {
        setCuestionario(encontrado);
        setRespuestas(
          encontrado.preguntas.map((p) => ({
            preguntaId: p._id,
            respuesta: "",
          }))
        );
      }
    };
    cargarCuestionario();
  }, [id]);

  const actualizarRespuesta = (i, valor) => {
    const nuevas = [...respuestas];
    nuevas[i].respuesta = valor;
    setRespuestas(nuevas);
  };

  const enviarRespuestas = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/responder-cuestionario",
        { cuestionarioId: id, respuestas },
        { withCredentials: true }
      );
      alert(`Respuestas enviadas. Tu nota: ${res.data.nota ?? "pendiente"}`);
      navigate("/perfil");
    } catch (error) {
      const msg = error.response?.data?.error || "Error al enviar respuestas";
      alert(msg);
      if (msg.includes("respondiste")) {
        navigate("/perfil");
      }
    }
  };

  if (!cuestionario) return <div className="p-6">Cargando cuestionario...</div>;

 return (
    <div className="max-w-4xl mx-auto mt-8 bg-[rgba(231,231,231,0.9)] p-6 rounded-lg shadow-lg border-2">
      <h1 className="text-2xl font-bold mb-2 text-center">{cuestionario.titulo}</h1>
      <p className="mb-6 text-center text-gray-700">{cuestionario.descripcion}</p>

      {cuestionario.preguntas.map((pregunta, i) => (
        <div key={pregunta._id} className="mb-6 border p-4 rounded-lg bg-white shadow">
          <p className="font-semibold mb-2">{i + 1}. {pregunta.enunciado}</p>

          {pregunta.tipo === "seleccion" ? (
            <div className="space-y-2">
              {pregunta.opciones.map((op, j) => (
                <label key={j} className="block">
                  <input
                    type="radio"
                    name={`pregunta-${i}`}
                    value={op}
                    checked={respuestas[i].respuesta === op}
                    onChange={() => actualizarRespuesta(i, op)}
                    className="mr-2"
                  />
                  {op}
                </label>
              ))}
            </div>
          ) : (
            <textarea
              className="w-full mt-2 border p-2 rounded placeholder-gray-500"
              placeholder="Respuesta..."
              value={respuestas[i].respuesta}
              onChange={(e) => actualizarRespuesta(i, e.target.value)}
            />
          )}
        </div>
      ))}

      <div className="flex justify-center">
        <button
          onClick={enviarRespuestas}
          className="bg-[#8b8a8a] rounded-md my-2 py-2 px-4 cursor-pointer"
        >
          Enviar respuestas
        </button>
      </div>
    </div>
  );
}

export default ResponderCuestionario;