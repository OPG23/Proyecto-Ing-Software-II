import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone"
import { useState } from "react";


function PaginaEditarTarea() {
    const navigate = useNavigate();
    const [lista_archivos, setlista_archivos] = useState([{name: "archivo_antiguo.pdf"}])

    const Guardar = (event) => {
        event.preventDefault();

        const confirmado = window.confirm("¿Está seguro de guardar los cambios?");
        if (confirmado) {
            window.alert("Tarea editada correctamente!")
            console.log("Cambios guardados");
            navigate("/tareas_profesor"); 
        }
    };

    return (
        <div className="flex h-full items-center justify-center my-16">
            <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid p-3">
                <h1 className="text-2xl font-bold text-center" >Editar Tarea</h1>
                <form className="flex flex-col align-items-stretch">
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Título</label>
                        <textarea className="rounded-xl border-2 border-solid text-center" >Título anterior</textarea>
                    </div>
                    <div className="flex justify-center items-center flex-col text-center my-4"> 
                        <label>Descripción</label>
                        <textarea className="rounded-xl border-2 border-solid text-center" >Descripción anterior</textarea>
                    </div>
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Fecha de entrega</label>
                        <input className="rounded-xl border-2 border-solid text-center p-2" type="date" />
                    </div>
                    <div className="rounded-xl border-2 border-solid text-center cursor-pointer p-2">
                        <Dropzone onDrop={(acceptedFiles) => setlista_archivos(prevlista => [...prevlista, ...acceptedFiles])}>
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
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Estado de la tarea</label>
                        <select className="rounded-xl border-2 border-solid text-center p-1">
                            <option value="activa">Activa</option>
                            <option value="oculta">Oculta</option>
                            <option value="cerrada">Cerrada</option>
                        </select>
                    </div>
                    <div className="text-center my-2">
                        <button className="bg-[#157347] rounded-md my-2 py-2 px-4 cursor-pointer text-white" type="submit" onClick={Guardar}>
                            Guardar cambios
                        </button>
                    </div>
                </form>
  
            </div>
        </div>
    )
}

export default PaginaEditarTarea;
