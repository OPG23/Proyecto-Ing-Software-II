/*import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropzone from "react-dropzone"
function PaginaCrearTarea() {
    const navigate = useNavigate();
    const [lista_archivos, setlista_archivos] = useState([])

    const CrearTarea = (event) => {
        event.preventDefault();

        const confirmado = window.confirm("¿Está seguro de crear esta tarea?");
        if (confirmado) {
            window.alert("Tarea creada!")
            console.log("Tarea creada");
            navigate("/tareas_profesor"); 
        }
    };


    return (
        <div className="flex h-full items-center justify-center my-16">
            <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid p-3">
                <h2 className="text-2xl font-bold text-center">Crear Nueva Tarea</h2>
                <form className="flex flex-col align-items-stretch">
                    <div className="flex justify-center items-center flex-col text-center my-4" >
                        <label >Título</label>
                        <input className="rounded-xl border-2 border-solid text-center" type="text" placeholder="Titulo"/>
                    </div>
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Descripción</label>
                        <textarea className="rounded-xl border-2 border-solid text-center"  placeholder="Descripción"></textarea>
                    </div>
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Fecha de entrega</label>
                        <input className="rounded-xl border-2 border-solid text-center p-1" type="date" />
                    </div>
                    <div className="rounded-xl border-2 border-solid text-center cursor-pointer p-2">
                        <Dropzone onDrop={(acceptedFiles) => setlista_archivos(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
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
                    <div className="text-center my-4">
                        <button className="bg-[#157347] text-white rounded-md my-2 py-2 px-4 cursor-pointer" type="submit" onClick={CrearTarea}>
                            Guardar tarea</button>
                    </div>
                </form>
            </div>
        </div>
        
    );
}

export default PaginaCrearTarea;
*/

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

function PaginaCrearTarea() {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
    const [archivos, setArchivos] = useState([]);

    const CrearTarea = async (event) => {
        event.preventDefault();

        const confirmado = window.confirm("¿Está seguro de crear esta tarea?");
        if (!confirmado) return;

        try {
            const formData = new FormData();
            formData.append("titulo", titulo);
            formData.append("descripcion", descripcion);
            formData.append("fechaEntrega", fechaEntrega);
            formData.append("profesor", "682e1b514f9ac59da83cd7ab");

            archivos.forEach((archivo) => {
                formData.append("archivos", archivo);
            });

            await axios.post("http://localhost:4000/api/tareas", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            window.alert("¡Tarea creada!");
            navigate("/tareas_profesor");
        } catch (error) {
            console.error("Error al crear la tarea:", error);
            alert("Hubo un error al crear la tarea.");
        }
    };

    return (
        <div className="flex h-full items-center justify-center my-16">
            <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid p-3">
                <h2 className="text-2xl font-bold text-center">Crear Nueva Tarea</h2>
                <form className="flex flex-col align-items-stretch" onSubmit={CrearTarea}>
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Título</label>
                        <input
                            className="rounded-xl border-2 border-solid text-center"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Título"
                            
                            required
                        />
                    </div>
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Descripción</label>
                        <textarea
                            className="rounded-xl border-2 border-solid text-center"
                            
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Descripción"
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Fecha de entrega</label>
                        <input
                            className="rounded-xl border-2 border-solid text-center p-1"
                            type="date"
                            value={fechaEntrega}
                            onChange={(e) => setFechaEntrega(e.target.value)}
                            required
                        />
                    </div>
                    <div className="rounded-xl border-2 border-solid text-center cursor-pointer p-2">
                        <Dropzone onDrop={(acceptedFiles) => setArchivos(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()} className="flex flex-col items-center">
                                        <h6>Arrastra tus archivos o da click para seleccionarlos</h6>
                                        <input {...getInputProps()} />
                                        <img src="/imgSubidaArchivo.svg" className="h-18 w-18 m-2" />
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    {archivos.length > 0 && (
                        <ul>
                            <h1>Archivos subidos:</h1>
                            {archivos.map((archivo, idx) => (
                                <li key={idx}>{archivo.name}</li>
                            ))}
                        </ul>
                    )}
                    <div className="text-center my-4">
                        <button
                            className="bg-[#157347] text-white rounded-md my-2 py-2 px-4 cursor-pointer"
                            type="submit"
                        >
                            Guardar tarea
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PaginaCrearTarea;
