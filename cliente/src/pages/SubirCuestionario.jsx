import { useState } from "react";
import axios from "axios";

function SubirCuestionario() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [preguntas, setPreguntas] = useState([]);

  const agregarPregunta = () => {
    setPreguntas([...preguntas, { enunciado: "", tipo: "seleccion", opciones: [""], respuestaCorrecta: "" }]);
  };

  const actualizarPregunta = (i, campo, valor) => {
    const nuevas = [...preguntas];
    nuevas[i][campo] = valor;
    setPreguntas(nuevas);
  };

  const agregarOpcion = (i) => {
    const nuevas = [...preguntas];
    nuevas[i].opciones.push("");
    setPreguntas(nuevas);
  };

  const actualizarOpcion = (i, j, valor) => {
    const nuevas = [...preguntas];
    nuevas[i].opciones[j] = valor;
    setPreguntas(nuevas);
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/api/cuestionarios", { titulo, descripcion, preguntas }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Cuestionario creado");
    } catch (err) {
      alert("Error al crear cuestionario");
    }
  };

  return (
    <div   className="max-w-3xl mx-auto mt-8 bg-[rgba(231,231,231,0.9)] rounded-lg shadow-lg p-6 border-2 mt-10 xl:mt-12.5"
    style={{ width: "768px", overflow: "auto" }}>
      <form onSubmit={enviarFormulario} className="space-y-4">
        <h1 className="text-2xl font-bold">Crear Cuestionario</h1>
        <input
          className="border p-2 w-full rounded-lg bg-[rgba(231,231,231,0.9)] placeholder-gray-500"
          
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
        />
        <textarea
          className="border p-2 w-full rounded-lg bg-[rgba(231,231,231,0.9)] placeholder-gray-500"
          
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
        />

        {preguntas.map((pregunta, i) => (
          <div key={i} className="border p-4 bg-[rgba(231,231,231,0.9)] rounded-lg space-y-2">
            <input
              className="border p-2 w-full rounded"
              placeholder="Enunciado"
              value={pregunta.enunciado}
              onChange={(e) => actualizarPregunta(i, "enunciado", e.target.value)}
            />
            <select
              value={pregunta.tipo}
              onChange={(e) => actualizarPregunta(i, "tipo", e.target.value)}
              className="border p-2 w-full rounded"
            >
              <option value="seleccion">Selección múltiple</option>
              <option value="abierta">Abierta</option>
            </select>
            {pregunta.tipo !== "abierta" && (
              <>
                {pregunta.opciones.map((op, j) => (
                  <input
                    key={j}
                    className="border p-2 w-full rounded"
                    placeholder={`Opción ${j + 1}`}
                    value={op}
                    onChange={(e) => actualizarOpcion(i, j, e.target.value)}
                  />
                ))}
                <button type="button" onClick={() => agregarOpcion(i)} className="text-blue-500">
                  + Agregar opción
                </button>
              </>
            )}
            <input
              className="border p-2 w-full rounded"
              placeholder="Respuesta correcta"
              value={pregunta.respuestaCorrecta}
              onChange={(e) => actualizarPregunta(i, "respuestaCorrecta", e.target.value)}
            />
          </div>
        ))}

        <div className="flex flex-wrap gap-4">
          <button type="button" onClick={agregarPregunta} className="bg-[#8b8a8a] rounded-md my-2 py-2 px-4 cursor-pointer">
            + Añadir pregunta
          </button>
          <button type="submit" className="bg-[#8b8a8a] rounded-md my-2 py-2 px-4 cursor-pointer">
            Guardar Cuestionario
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubirCuestionario;