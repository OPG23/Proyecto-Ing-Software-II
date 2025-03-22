import { usoAutenticacion } from "../context/ContextoAutenticacion";
import TarjetaTarea from "../components/TarjetaTarea";
import TarjetaTareaMini from "../components/TarjetaTareaMini";

function paginaPerfil() {
  const { usuario } = usoAutenticacion();
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
        Bienvenido {usuario.nombre}
      </h1>
      <input
        type="text"
        placeholder="Buscar tarea"
        className="border-2 h-10 w-full sm:w-80 md:w-96 lg:w-1/2 xl:w-1/3 mt-6 px-4 text-lg rounded-md"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8 w-full max-w-screen-lg overflow-hidden">
        <TarjetaTareaMini
          urlImagen="./imgTarjeta.svg"
          titulo="Titulo tarea 1"
          descripcion="Descripción tarea 1"
        />
        <TarjetaTareaMini
          urlImagen="./imgTarjeta.svg"
          titulo="Titulo tarea 2"
          descripcion="Descripción tarea 2"
        />
        <TarjetaTareaMini
          urlImagen="./imgTarjeta.svg"
          titulo="Titulo tarea 3"
          descripcion="Descripción tarea 3"
        />
        <TarjetaTareaMini
          urlImagen="./imgTarjeta.svg"
          titulo="Titulo tarea 4"
          descripcion="Descripción tarea 4"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-10 w-full max-w-screen-lg overflow-hidden">
        <TarjetaTarea
          urlImagen="./imgTarjeta.svg"
          titulo="Titulo tarea 1"
          descripcion="Descripción tarea 1"
        />
        <TarjetaTarea
          urlImagen="./imgTarjeta.svg"
          titulo="Titulo tarea 2"
          descripcion="Descripción tarea 2"
        />
        <TarjetaTarea
          urlImagen="./imgTarjeta.svg"
          titulo="Titulo tarea 3"
          descripcion="Descripción tarea 3"
        />
        <TarjetaTarea
          urlImagen="./imgTarjeta.svg"
          titulo="Titulo tarea 4"
          descripcion="Descripción tarea 4"
        />
        <TarjetaTarea
          urlImagen="./imgTarjeta.svg"
          titulo="Titulo tarea 5"
          descripcion="Descripción tarea 5"
        />
        <TarjetaTarea
          urlImagen="./imgTarjeta.svg"
          titulo="Titulo tarea 6"
          descripcion="Descripción tarea 6"
        />
      </div>
    </div>
  );
}

export default paginaPerfil;
