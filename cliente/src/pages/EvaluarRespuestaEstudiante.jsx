import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EvaluarRespuestaEstudiante() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [respuesta, setRespuesta] = useState(null);
  const [calificaciones, setCalificaciones] = useState([]);

  useEffect(() => {
    const fetchRespuesta = async () => {
      const res = await axios.get(`http://localhost:4000/api/respuesta/${id}`, {
        withCredentials: true,
      });
      setRespuesta(res.data);

      const inicial = res.data.respuestas.map((r, i) => {
        const tipo = res.data.cuestionarioId.preguntas[i].tipo;
        return {
          tipo,
          calificada: tipo === "abierta" ? "" : null,
          correcta:
            tipo !== "abierta" &&
            r.respuesta === res.data.cuestionarioId.preguntas[i].respuestaCorrecta,
        };
      });

      setCalificaciones(inicial);
    };
    fetchRespuesta();
  }, [id]);

  const guardarNota = async () => {
    const correctas = calificaciones.reduce((acc, c) => {
      if (c.tipo === "abierta") {
        return acc + (c.calificada === "correcta" ? 1 : 0);
      } else {
        return acc + (c.correcta ? 1 : 0);
      }
    }, 0);

    const total = calificaciones.length;
    const notaFinal = parseFloat((5 * (correctas / total)).toFixed(2));

    try {
      await axios.put(
        `http://localhost:4000/api/respuesta/${id}/calificar`,
        { nota: notaFinal },
        { withCredentials: true }
      );
      alert(`Nota actualizada: ${notaFinal}`);
      navigate("/mis-cuestionarios");
    } catch (err) {
      alert("Error al guardar nota");
    }
  };

  if (!respuesta) return <div className="p-6">Cargando respuesta...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-[rgba(231,231,231,0.9)] rounded-lg shadow-lg p-6 border-2">
      <h1 className="text-2xl font-bold mb-4 text-center">Evaluar Respuesta</h1>
      <p className="mb-2 text-gray-600 text-center">
        Estudiante: {respuesta.estudianteId.nombres} {respuesta.estudianteId.apellidos}
      </p>

      {respuesta.respuestas.map((r, i) => {
        const p = respuesta.cuestionarioId.preguntas[i];
        const tipo = p.tipo;

        return (
          <div key={i} className="mb-6 border p-4 rounded-lg bg-white shadow">
            <p className="font-semibold">{i + 1}. {p.enunciado}</p>
            <p className="mt-2">Respuesta del estudiante: <strong>{r.respuesta}</strong></p>

            {tipo === "abierta" ? (
              <div className="mt-2">
                <label className="mr-4">
                  <input
                    type="radio"
                    name={`calificacion-${i}`}
                    value="correcta"
                    onChange={() => {
                      const copia = [...calificaciones];
                      copia[i].calificada = "correcta";
                      setCalificaciones(copia);
                    }}
                  /> Correcta
                </label>
                <label>
                  <input
                    type="radio"
                    name={`calificacion-${i}`}
                    value="incorrecta"
                    onChange={() => {
                      const copia = [...calificaciones];
                      copia[i].calificada = "incorrecta";
                      setCalificaciones(copia);
                    }}
                  /> Incorrecta
                </label>
              </div>
            ) : (
              <p className="text-sm mt-2 text-gray-500">
                Correcta: <strong>{p.respuestaCorrecta}</strong>
              </p>
            )}
          </div>
        );
      })}

      <button
        onClick={guardarNota}
        className="bg-[#8b8a8a] rounded-md my-2 py-2 px-4 cursor-pointer"
      >
        Guardar Nota Final
      </button>
    </div>
  );
}

export default EvaluarRespuestaEstudiante;