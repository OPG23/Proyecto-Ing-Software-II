import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usoTarea } from "../context/ContextoTarea";

function PaginaTareasProfesor() {
    const navigate = useNavigate();
    const { tareas, listarTareas, eliminarTarea, cargando } = usoTarea();

    useEffect(() => {
        listarTareas();
    }, []);

    const handleEliminar = async (id) => {
        const confirmado = window.confirm("¿Está seguro de eliminar esta tarea?");
        if (confirmado) {
            await eliminarTarea(id);
        }
    };

    const handleEditar = (id) => {
        navigate(`/editar_tarea?id=${id}`);
    };

    const handleCrear = () => {
        navigate("/crear_tarea");
    };

    return (
        <div className="flex h-full items-center justify-center my-16">
            <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid py-2 p-4">
                <h1 className="text-2xl font-bold text-center py-2">Tareas asignadas</h1>
                <div className="space-y-4 items-center justify-center">
                    {cargando ? (
                        <div className="text-center">Cargando...</div>
                    ) : tareas.length === 0 ? (
                        <div className="text-center my-4">
                            <button className="bg-[#157347] rounded-md my-2 py-1 px-4 cursor-pointer text-white" onClick={handleCrear}>
                                + Añadir tarea
                            </button>
                        </div>
                    ) : (
                        <>
                            {tareas.map((tarea) => (
                                <div key={tarea._id} className="rounded-2xl border-2 border-gray-400 text-center py-4 px-3 space-x-4">
                                    <h2 className="font-bold">{tarea.titulo}</h2>
                                    <button
                                        className="bg-blue-600 rounded-md my-2 py-1 px-4 cursor-pointer text-white"
                                        onClick={() => handleEditar(tarea._id)}
                                    >
                                        ✏️ Editar
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        onClick={() => handleEliminar(tarea._id)}
                                    >
                                        🗑 Eliminar
                                    </button>
                                    <button
                                        className="bg-purple-600 text-white rounded-md my-2 py-1 px-4 cursor-pointer"
                                        onClick={() => navigate(`/entregas_tarea?id=${tarea._id}`)}
                                    >
                                        📄 Ver entregas
                                    </button>

                                </div>
                            ))}
                            <div className="text-center my-4">
                                <button className="bg-[#157347] rounded-md my-2 py-1 px-4 cursor-pointer text-white" onClick={handleCrear}>
                                    + Añadir tarea
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PaginaTareasProfesor;
