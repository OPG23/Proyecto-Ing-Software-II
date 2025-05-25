import { useNavigate, useLocation } from "react-router-dom";
import Dropzone from "react-dropzone";
import { useState, useEffect } from "react";
import { usoTarea } from "../context/ContextoTarea";


function PaginaEditarTarea() {
    const navigate = useNavigate();
    const location = useLocation();
    const { obtenerTarea, tareaSeleccionada, editarTarea } = usoTarea();

    // Obtener el id de la tarea desde la query (?id=...)
    const searchParams = new URLSearchParams(location.search);
    const tareaId = searchParams.get("id");

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
    const [lista_archivos, setlista_archivos] = useState([]);

    useEffect(() => {
        if (tareaId) {
            obtenerTarea(tareaId);
        }
    }, [tareaId]);

    useEffect(() => {
        if (tareaSeleccionada) {
            setTitulo(tareaSeleccionada.titulo || "");
            setDescripcion(tareaSeleccionada.descripcion || "");
            setFechaEntrega(
                tareaSeleccionada.fechaEntrega
                    ? tareaSeleccionada.fechaEntrega.slice(0, 10)
                    : ""
            );
            setlista_archivos(
                tareaSeleccionada.archivos
                    ? tareaSeleccionada.archivos.map((name) => ({ name }))
                    : []
            );
        }
    }, [tareaSeleccionada]);

    const Guardar = async (event) => {
        event.preventDefault();
        const confirmado = window.confirm("¿Está seguro de guardar los cambios?");
        if (!confirmado) return;

        // Solo se envían los nombres de los archivos, adapta si necesitas subir archivos reales
        const archivos = lista_archivos.map((archivo) => archivo.name);

        await editarTarea(tareaId, {
            titulo,
            descripcion,
            fechaEntrega,
            archivos,
        });

        navigate("/tareas_profesor");
    };

    return (
        <div className="flex h-full items-center justify-center my-16">
            <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid p-3">
                <h1 className="text-2xl font-bold text-center" >Editar Tarea</h1>
                <form className="flex flex-col align-items-stretch" onSubmit={Guardar}>
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Título</label>
                        <input
                            className="rounded-xl border-2 border-solid text-center"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-center items-center flex-col text-center my-4"> 
                        <label>Descripción</label>
                        <textarea
                            className="rounded-xl border-2 border-solid text-center"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Fecha de entrega</label>
                        <input
                            className="rounded-xl border-2 border-solid text-center p-2"
                            type="date"
                            value={fechaEntrega}
                            onChange={(e) => setFechaEntrega(e.target.value)}
                            required
                        />
                    </div>
                    <div className="rounded-xl border-2 border-solid text-center cursor-pointer p-2">
                        <Dropzone onDrop={(acceptedFiles) => setlista_archivos(prevlista => [...prevlista, ...acceptedFiles])}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()} className="flex flex-col items-center w-{75%}">
                                        <h6>Arrastra tus archivos o da click para seleccionarlos</h6>
                                        <input {...getInputProps()} />
                                        <img src="/imgSubidaArchivo.svg" className="h-18 w-18 m-2"/>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    {
                        lista_archivos.length > 0 && (
                            <ul>
                                <h1>Archivos subidos:</h1>
                            {lista_archivos.map((archivo, idx) => (
                                <li key={idx}>{archivo.name}</li>
                            ))}
                            </ul>
                        )
                    }
                    {/* Estado de la tarea omitido, ya que el modelo no lo tiene */}
                    <div className="text-center my-2">
                        <button className="bg-[#157347] rounded-md my-2 py-2 px-4 cursor-pointer text-white" type="submit">
                            Guardar cambios
                        </button>
                    </div>
                </form>
  
            </div>
        </div>
    )
}

export default PaginaEditarTarea;
