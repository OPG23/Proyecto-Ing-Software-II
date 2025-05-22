/*
import { Navigate } from "react-router-dom";

function PaginaTareasProfesor() {
    const EliminarTarea = () => {
        const confirmado = window.confirm("¿Está seguro de eliminar esta tarea?");
        if (confirmado) {
            console.log("Tarea eliminada");
        }
    };

    return (
        <div className="flex h-full items-center justify-center my-16">
            <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid py-2">
                <h1 className="text-2xl font-bold text-center py-2">Tareas asignadas</h1>
                <div className="space-y-4"> 
                    <div className="rounded-2xl border-2 border-gray-400 text-center py-4 px-3 space-x-4">
                        <h2>Tarea 1</h2>
                        <button className="bg-[#8b8a8a] text-white px-3 py-1 rounded-md hover:bg-blue-600">
                            ✏️ Editar
                        </button>
                        <button className="bg-[#8b8a8a] text-white px-3 py-1 rounded-md hover:bg-red-600" onClick={EliminarTarea}>
                            🗑 Eliminar
                        </button>
                    </div>
                    <div className="rounded-2xl border-2 border-gray-400 text-center py-4 px-3 space-x-4">
                        <h2>Tarea 2</h2>
                        <button className="bg-[#8b8a8a] text-white px-3 py-1 rounded-md hover:bg-blue-600">
                            ✏️ Editar
                        </button>
                        <button className="bg-[#8b8a8a] text-white px-3 py-1 rounded-md hover:bg-red-600 " onClick={EliminarTarea} >
                            🗑 Eliminar
                        </button>
                    </div>
                <div className="text-center my-4">
                    <button className="bg-[#8b8a8a] rounded-md my-2 py-2 px-4 cursor-pointer">
                        + Nueva tarea
                    </button>
                </div>
                
                </div>
            </div>
        </div>
    )
}

export default PaginaTareasProfesor;

*/

/*import { useNavigate } from "react-router-dom";

function PaginaTareasProfesor() {
    const navigate = useNavigate();

    const EliminarTarea = () => {
        const confirmado = window.confirm("¿Está seguro de eliminar esta tarea?");
        if (confirmado) {
            console.log("Tarea eliminada");
        }
    };

    const Editar = (event) => {
        event.preventDefault();
        navigate("/editar_tarea"); 
    };

    const Crear = (event) => {
        event.preventDefault();
        navigate("/crear_tarea"); 
    };
    return (
        <div className="flex h-full items-center justify-center my-16">
            <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid py-2 p-4">
                <h1 className="text-2xl font-bold text-center py-2">Tareas asignadas</h1>
                <div className="space-y-4 items-center jjustify-center "> 
                    <div className="rounded-2xl border-2 border-gray-400 text-center py-4 px-3 space-x-4 ">
                        <h2>Tarea 1</h2>
                        <button className="bg-blue-600 rounded-md my-2 py-1 px-4 cursor-pointer text-white" 
                        onClick={Editar}>✏️ Editar</button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-600" onClick={EliminarTarea}>
                            🗑 Eliminar
                        </button>
                    </div>
                    <div className="rounded-2xl border-2 border-gray-400 text-center py-4 px-3 space-x-4 ">
                        <h2>Tarea 2</h2>
                        <button className="bg-blue-600 rounded-md my-2 py-1 px-4 cursor-pointer text-white" 
                        onClick={Editar}>✏️ Editar</button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-600 " onClick={EliminarTarea} >
                            🗑 Eliminar
                        </button>
                    </div>
                <div className="text-center my-4">
                    <button className="bg-[#157347] rounded-md my-2 py-1 px-4 cursor-pointer text-white" onClick={Crear}>+ Añadir tarea</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default PaginaTareasProfesor;
*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaginaTareasProfesor() {
    const navigate = useNavigate();
    const [tareas, setTareas] = useState([]);
    const profesorId = "123"; // Reemplaza esto con el ID real del profesor (puede venir de auth)

    useEffect(() => {
        const obtenerTareas = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/tareas/profesor/${profesorId}`);
                setTareas(res.data);
            } catch (error) {
                console.error("Error al obtener tareas:", error);
            }
        };

        obtenerTareas();
    }, [profesorId]);

    const eliminarTarea = async (id) => {
        const confirmado = window.confirm("¿Está seguro de eliminar esta tarea?");
        if (confirmado) {
            try {
                await axios.delete(`http://localhost:4000/api/tareas/${id}`);
                setTareas(tareas.filter(t => t._id !== id));
            } catch (error) {
                console.error("Error al eliminar tarea:", error);
            }
        }
    };

    const editarTarea = (id) => {
        navigate(`/editar_tarea/${id}`);
    };

    const crearTarea = () => {
        navigate("/crear_tarea");
    };

    return (
        <div className="flex h-full items-center justify-center my-16">
            <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid py-2 p-4">
                <h1 className="text-2xl font-bold text-center py-2">Tareas asignadas</h1>
                <div className="space-y-4 items-center justify-center">
                    {tareas.length === 0 ? (
                        <div className="text-center my-4">
                            <button className="bg-[#157347] rounded-md my-2 py-1 px-4 cursor-pointer text-white"
                                onClick={crearTarea}>
                                + Añadir tarea
                            </button>
                        </div>
                    ) : (
                        <>
                            {tareas.map((tarea, index) => (
                                <div key={tarea._id} className="rounded-2xl border-2 border-gray-400 text-center py-4 px-3 space-x-4">
                                    <h2>Tarea {index + 1}: {tarea.titulo}</h2>
                                    <button className="bg-blue-600 rounded-md my-2 py-1 px-4 cursor-pointer text-white"
                                        onClick={() => editarTarea(tarea._id)}>✏️ Editar</button>
                                    <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        onClick={() => eliminarTarea(tarea._id)}>🗑 Eliminar</button>
                                </div>
                            ))}
                            <div className="text-center my-4">
                                <button className="bg-[#157347] rounded-md my-2 py-1 px-4 cursor-pointer text-white"
                                    onClick={crearTarea}>+ Añadir tarea</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PaginaTareasProfesor;
