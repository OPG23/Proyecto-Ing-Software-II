function PaginaListaTareas() {

    return (
        <div className="flex h-full items-center justify-center my-16">
            <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 border-solid">
                <h1 className="text-2xl font-bold text-center">Lista de Tareas</h1>
                <ul>
                    <li className="rounded-2xl border-2 border-solid text-center">
                        <h2>Tarea 1</h2>
                        <p>Descripción de la tarea 1</p>
                        <a href="http://localhost:5173/entregar_tarea">Ver detalles</a>
                    </li>
                    <li className="rounded-2xl border-2 border-solid text-center">
                        <h2 className="text-2xl font-bold text-center" >Tarea 2</h2>
                        <p>Descripción de la tarea 2</p>
                        <a href="http://localhost:5173/entregar_tarea text-center">Ver detalles</a>
                    </li>
                    <li className="rounded-2xl border-2 border-solid text-center">
                        <h2 className="text-2xl font-bold text-center">Tarea 3</h2>
                        <p>Descripción de la tarea 3</p>
                        <a href="http://localhost:5173/entregar_tarea">Ver detalles</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PaginaListaTareas;
