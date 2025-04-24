import { useNavigate } from "react-router-dom";
function PaginaCrearTarea() {

    const navigate = useNavigate();

    const CrearTarea = (event) => {
        event.preventDefault();

        const confirmado = window.confirm("¿Está seguro de crear esta tarea?");
        if (confirmado) {
            console.log("Tarea creada");
            navigate("/tareas_profesor"); 
        }
    };


    return (
        <div className="flex h-full items-center justify-center my-16">
            <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid">
                <h2 className="text-2xl font-bold text-center">Crear Nueva Tarea</h2>
                <form className="flex flex-col align-items-stretch">
                    <div className="flex justify-center items-center flex-col text-center my-4" >
                        <label >Título</label>
                        <input className="rounded-xl border-2 border-solid text-center" type="text"/>
                    </div>
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Descripción</label>
                        <textarea className="rounded-xl border-2 border-solid text-center"  ></textarea>
                    </div>
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Fecha de entrega</label>
                        <input className="rounded-xl border-2 border-solid text-center" type="date" />
                    </div>
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Archivo adjunto</label>
                        <input className="rounded-xl border-2 border-solid text-center" type="file"/>
                    </div>
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
