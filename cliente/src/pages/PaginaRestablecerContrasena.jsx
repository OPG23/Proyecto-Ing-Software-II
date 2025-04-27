import { useForm } from "react-hook-form";
import { usoAutenticacion } from "../context/ContextoAutenticacion";

function PaginaRestablecimiento() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { restablecerContrasena, errores } = usoAutenticacion();

  const onSubmit = handleSubmit(async (data) => {
    data.usuario = data.usuario.toLowerCase();
    data.cedula = parseInt(data.cedula);
    await restablecerContrasena(data);
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-[rgba(231,231,231,0.9)] max-w-sm w-85 p-7 rounded-3xl border-2">
        {Array.isArray(errores) &&
          errores.map((error, i) => (
            <div
              className="text-red-500 text-center rounded-md my-2 font-bold"
              key={i}
            >
              {error}
            </div>
          ))}

        <h1 className="text-2xl text-center text-black mb-4 font-bold">
          Restablecimiento de contraseña
        </h1>

        <form onSubmit={onSubmit}>
          <div className="flex flex-col items-center">

            {/* Usuario */}
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                {...register("usuario", { required: true })}
                className="border-2 text-black py-2 rounded-md my-2 text-center w-60 ml-5"
                placeholder="Usuario"
              />
              <img
                src="/imgUsuarioInicioSesion.svg"
                alt="Imagen usuario"
                className="absolute left-6 top-1/2 transform -translate-y-1/2 h-12 w-12"
              />
            </div>
            {errors.usuario && (
              <p className="text-red-500 text-sm">El usuario es requerido</p>
            )}

            {/* Cédula */}
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                {...register("cedula", { required: true })}
                className="border-2 text-black py-2 rounded-md my-2 text-center w-60 ml-5"
                placeholder="Cédula"
              />
              <img
                src="/imgUsuarioInicioSesion.svg"
                alt="Imagen cédula"
                className="absolute left-6 top-1/2 transform -translate-y-1/2 h-12 w-12"
              />
            </div>
            {errors.cedula && (
              <p className="text-red-500 text-sm">La cédula es requerida</p>
            )}

            {/* Nueva Contraseña */}
            <div className="relative w-full max-w-xs">
              <input
                type="password"
                {...register("nuevaContrasena", { required: true })}
                className="border-2 text-black py-2 rounded-md my-2 text-center w-60 ml-5"
                placeholder="Nueva Contraseña"
              />
              <img
                src="/imgClaveInicioSesion.svg"
                alt="Imagen clave"
                className="absolute left-8.5 top-1/2 transform -translate-y-1/2 h-6 w-6"
              />
            </div>
            {errors.nuevaContrasena && (
              <p className="text-red-500 text-sm">La nueva contraseña es requerida</p>
            )}

            {/* Confirmar Contraseña */}
            <div className="relative w-full max-w-xs">
              <input
                type="password"
                {...register("confirmarContrasena", {
                  required: "Debes confirmar la contraseña",
                  validate: (value, formValues) => value === formValues.nuevaContrasena || "Las contraseñas no coinciden"
                })}                
                className="border-2 text-black py-2 rounded-md my-2 text-center w-60 ml-5"
                placeholder="Confirmar Contraseña"
              />
              <img
                src="/imgClaveInicioSesion.svg"
                alt="Imagen clave"
                className="absolute left-8.5 top-1/2 transform -translate-y-1/2 h-6 w-6"
              />
            </div>
            {errors.confirmarContrasena && (
              <p className="text-red-500 text-sm">{errors.confirmarContrasena.message}</p>
            )}
            <button
              type="submit"
              className="bg-[#8b8a8a] text-black rounded-md my-4 py-2 px-4 w-35 cursor-pointer"
            >
              Restablecer contraseña
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default PaginaRestablecimiento;
