import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { usoEntrega } from "../context/ContextoEntrega";
import { usoTarea } from "../context/ContextoTarea";

function PaginaEntregaTareas() {
  const navigate = useNavigate();
  const location = useLocation();
  const { entregarTarea } = usoEntrega();
  const { obtenerTarea, tareaSeleccionada } = usoTarea();

  const searchParams = new URLSearchParams(location.search);
  const tareaId = searchParams.get("id");

  const [comentario, setComentario] = useState("");
  const [lista_archivos, setlista_archivos] = useState([]);

  useEffect(() => {
    if (tareaId) obtenerTarea(tareaId);
  }, [tareaId]);

  const EntregarTarea = async (event) => {
    event.preventDefault();

    if (!tareaId) {
      alert("Error: no se encontró el ID de la tarea.");
      return;
    }

    const confirmado = window.confirm("¿Está seguro de enviar esta tarea?");
    if (!confirmado) return;

    const archivo = lista_archivos.length > 0 ? lista_archivos[0] : null;

    const formData = new FormData();
    formData.append("tarea", tareaId);
    formData.append("comentario", comentario);
    if (archivo) {
      formData.append("archivo", archivo);
    }

    await entregarTarea(formData);
    navigate("/lista_tareas");
  };

  return (
    <div className="flex h-full items-center justify-center my-16">
      <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid p-3">
        <h1 className="text-2xl font-bold text-center">Entrega de Tareas</h1>
        <form className="flex flex-col align-items-stretch" onSubmit={EntregarTarea}>
          <div className="flex justify-center items-center flex-col text-center my-4">
            <label>Título de la tarea</label>
            <input
              className="rounded-xl border-2 border-solid text-center"
              type="text"
              value={tareaSeleccionada?.titulo || ""}
              disabled
            />
          </div>
          <div className="flex justify-center items-center flex-col text-center my-4">
            <label>Descripción</label>
            <textarea
              className="rounded-xl border-2 border-solid text-center"
              value={tareaSeleccionada?.descripcion || ""}
              disabled
            ></textarea>
          </div>
          <div className="flex justify-center items-center flex-col text-center my-4">
            <label>Comentario</label>
            <textarea
              className="rounded-xl border-2 border-solid text-center"
              placeholder="Comentario opcional"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            ></textarea>
          </div>
          <div className="rounded-xl border-2 border-solid text-center cursor-pointer p-2">
            <Dropzone onDrop={(acceptedFiles) => setlista_archivos(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()} className="flex flex-col items-center w-[75%]">
                    <h6>Arrastra tus archivos o da click para seleccionarlos</h6>
                    <input {...getInputProps()} />
                    <img src="/imgSubidaArchivo.svg" className="h-18 w-18 m-2" />
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          {lista_archivos.length > 0 && (
            <ul>
              <h1>Archivos subidos:</h1>
              {lista_archivos.map((archivo, idx) => (
                <li key={idx}>{archivo.name}</li>
              ))}
            </ul>
          )}
          <div className="text-center my-4">
            <button className="bg-[#157347] rounded-md my-2 py-2 px-4 cursor-pointer text-white" type="submit">
              Enviar tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaginaEntregaTareas;
