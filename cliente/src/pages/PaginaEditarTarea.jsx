import { useNavigate, useLocation } from "react-router-dom";
import Dropzone from "react-dropzone";
import { useState, useEffect } from "react";
import { usoTarea } from "../context/ContextoTarea";


function PaginaEditarTarea() {
    const navigate = useNavigate();
    const location = useLocation();
    const { obtenerTarea, tareaSeleccionada, editarTarea } = usoTarea();

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
            <div className="bg-[rgba(231,231,231,0.9)] max-w-3xl w-full pt-5 rounded-4xl border-2 border-solid p-6">
                
                <form className="flex flex-col align-items-stretch" onSubmit={Guardar}>
                    <div className="rounded-2xl border-2 border-gray-400 text-left py-4 px-4 space-y-2  mb-6">
                        <h1 className="text-2xl font-bold text-center" >Editar Tarea</h1>
                        <div className="flex justify-center  items-center flex-col text-center my-4">
                            <label className="font-bold">Título</label>
                            <input
                                className="rounded-xl border-2 border-solid text-center"
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-center items-center flex-col text-center my-4"> 
                            <label className="font-bold">Descripción</label>
                            <textarea
                                className="rounded-xl border-2 border-solid text-center"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="flex justify-center items-center flex-col text-center my-4">
                            <label className="font-bold">Fecha de entrega</label>
                            <input
                                className="rounded-xl border-2 border-solid text-center p-2"
                                type="date"
                                value={fechaEntrega}
                                onChange={(e) => setFechaEntrega(e.target.value)}
                                required
                            />
                        </div>
                        <label className="font-bold text-center flex flex-col items-center">Archivos</label>
                        <div className="rounded-xl border-2 border-solid text-center cursor-pointer p-2" >
                            
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
                                    <h1 className="font-bold">Archivos subidos:</h1>
                                {lista_archivos.map((archivo, idx) => (
                                    <li key={idx}>{archivo.name}</li>
                                ))}
                                </ul>
                            )
                        }
                        <div className="text-center my-2">
                            <button className="bg-[#157347] rounded-md my-2 py-2 px-4 cursor-pointer text-white" type="submit">
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </form>

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
    )
}

export default PaginaEditarTarea;
