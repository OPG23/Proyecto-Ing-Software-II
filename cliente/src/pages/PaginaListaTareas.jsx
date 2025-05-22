import { useNavigate } from "react-router-dom";

function PaginaListaTareas() {
    const navigate = useNavigate();

    const Entregar = (event) => {
        event.preventDefault();
        navigate("/entregar_tarea"); 
    };

    return (
        <div className="flex h-full items-center justify-center my-16">
            <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid">
                <h1 className="text-2xl font-bold text-center">Lista de Tareas</h1>
                <ul className="mx-4 ">
                    <li className="rounded-2xl border-2 border-gray-400 text-center my-4 py-1 space-y-2">
                        <h2 className="text-2xl font-bold text-center">Tarea 1</h2>
                        <p>Descripción de la tarea 1</p>
                        <button className="bg-[#157347] rounded-md my-2 py-1 px-4 cursor-pointer text-white" onClick={Entregar}>Entregar tarea</button>
                    </li>
                    <li className="rounded-2xl border-2 border-gray-400 text-center my-4 py-1 space-y-2">
                        <h2 className="text-2xl font-bold text-center" >Tarea 2</h2>
                        <p>Descripción de la tarea 2</p>
                        <button className="bg-[#157347] rounded-md my-2 py-1 px-4 cursor-pointer text-white" onClick={Entregar}>Entregar tarea</button>
                    </li>
                    <li className="rounded-2xl border-2 border-gray-400 text-center my-4 py-1 space-y-2">
                        <h2 className="text-2xl font-bold text-center">Tarea 3</h2>
                        <p>Descripción de la tarea 3</p>
                        <button className="bg-[#157347] rounded-md my-2 py-1 px-4 cursor-pointer text-white" onClick={Entregar}>Entregar tarea</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PaginaListaTareas;
