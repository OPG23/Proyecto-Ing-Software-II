/*function PaginaEntregaTareas() {
    console.log("ESTOY ENTRANDO A LA FUNCIÓN") //A esto le llamo debug
    return (
        <div className="flex h-full items-center justify-center my-16">
            <h1>Entrega de Tareas</h1>
            
        </div>
    );
}

export default PaginaEntregaTareas; */

function PaginaEntregaTareas() {
    return (
        <div className="flex h-full items-center justify-center my-16">
            <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid">
                <h1 className="text-2xl font-bold text-center">Entrega de Tareas</h1>
                <form className="flex flex-col align-items-stretch">
                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Título de la tarea</label>
                        <input className="rounded-xl border-2 border-solid text-center" type="text" placeholder="Título de la tarea" />
                    </div>

                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Descripción</label>
                        <textarea className=" rounded-xl border-2 border-solid text-center" placeholder="Descripción"></textarea>
                    </div>

                    <div className="flex justify-center items-center flex-col text-center my-4">
                        <label>Subir archivo</label>
                        <input className="rounded-xl border-2 border-solid" type="file" />
                    </div>

                    <div className="text-center my-4">
                        <button className="bg-[#8b8a8a] rounded-md my-2 py-2 px-4 cursor-pointer" type="submit">Enviar tarea</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PaginaEntregaTareas;



