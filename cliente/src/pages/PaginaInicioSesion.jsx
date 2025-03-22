import { useForm } from "react-hook-form";
import { usoAutenticacion } from "../context/ContextoAutenticacion";

function PaginaInicioSesion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { iniciarSesion, errores } = usoAutenticacion();
  const onSubmit = handleSubmit((data) => {
    iniciarSesion(data);
  });

  return (
    <div className="flex h-full items-center justify-center mt-20">
      <div className="bg-[rgba(231,231,231,0.9)] max-w-sm w-full sm:w-96 md:w-1/3 p-8 sm:p-10 rounded-3xl border-2">
        {Array.isArray(errores) &&
          errores.map((error, i) => (
            <div
              className="bg-red-500 p-2 text-white text-center rounded-md my-2"
              key={i}
            >
              {error}
            </div>
          ))}
        <h1 className="text-2xl text-center text-black mb-4 font-bold">
          Inicio de sesión
        </h1>

        <form onSubmit={onSubmit}>
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                {...register("usuario", { required: true })}
                className="border-2 text-black py-2 rounded-md my-2 text-center w-full"
                placeholder="Usuario"
              />
              <img
                src="/imgUsuarioInicioSesion.svg"
                alt="Imagen usuario"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6"
              />
            </div>
            {errors.usuario && (
              <p className="text-red-500 text-sm">El usuario es requerido</p>
            )}
            <div className="relative w-full max-w-xs">
              <input
                type="password"
                {...register("clave", { required: true })}
                className="w-full border-2 text-black py-2 rounded-md my-2 text-center"
                placeholder="Clave"
              />
              <img
                src="/imgClaveInicioSesion.svg"
                alt="Imagen clave"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6"
              />
            </div>
            {errors.clave && (
              <p className="text-red-500 text-sm">La clave es requerida</p>
            )}

            <button
              type="submit"
              className="bg-[#8b8a8a] text-white rounded-md my-4 py-2 px-4 w-full cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaginaInicioSesion;
