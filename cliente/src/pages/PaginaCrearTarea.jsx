import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { usoTarea } from "../context/ContextoTarea";

function PaginaCrearTarea() {
    const navigate = useNavigate();
    const { crearTarea } = usoTarea();

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
    const [lista_archivos, setlista_archivos] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const confirmado = window.confirm("¿Está seguro de crear esta tarea?");
        if (!confirmado) return;

        const archivos = lista_archivos.map((archivo) => archivo.name);

        try {
            // Asegúrate de que crearTarea retorne una promesa y que el backend esté recibiendo el usuario autenticado
            await crearTarea({
                titulo,
                descripcion,
                fechaEntrega, // formato YYYY-MM-DD
                archivos,
            });
            // Espera a que la tarea se guarde antes de navegar
            navigate("/tareas_profesor");
        } catch (error) {
            // Muestra el error exacto para depuración
            alert("Error al guardar la tarea: " + (error?.response?.data?.message || error.message));
            console.error(error);
        }
    };

    return (
        <div className="flex h-full items-center justify-center my-16">
            <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid p-3">
                
                <form className="flex flex-col align-items-stretch" onSubmit={handleSubmit}>
                    <div className="rounded-2xl border-2 border-gray-400 text-left py-4 px-4 space-y-2  mb-6">
                        <h2 className="text-2xl font-bold text-center">Crear Nueva Tarea</h2>
                        <div className="flex justify-center items-center flex-col text-center my-4" >
                            <label className="font-bold" >Título</label>
                            <input
                                className="rounded-xl border-2 border-solid text-center"
                                type="text"
                                placeholder="Titulo"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-center items-center flex-col text-center my-4">
                            <label className="font-bold">Descripción</label>
                            <textarea
                                className="rounded-xl border-2 border-solid text-center"
                                placeholder="Descripción"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="flex justify-center items-center flex-col text-center my-4">
                            <label className="font-bold">Fecha de entrega</label>
                            <input
                                className="rounded-xl border-2 border-solid text-center p-1"
                                type="date"
                                value={fechaEntrega}
                                onChange={(e) => setFechaEntrega(e.target.value)}
                                required
                            />
                        </div>
                        <label className="font-bold text-center flex flex-col items-center">Archivos</label>
                        <div className="rounded-xl border-2 border-solid text-center cursor-pointer p-2">
                            <Dropzone onDrop={(acceptedFiles) => setlista_archivos(acceptedFiles)}>
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()} className="flex flex-col items-center w-{75%}">
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
                            <button className="bg-[#157347] text-white rounded-md my-2 py-2 px-4 cursor-pointer" type="submit">
                                Guardar tarea
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
    );
}

export default PaginaCrearTarea;
