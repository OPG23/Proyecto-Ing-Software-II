import { useForm } from "react-hook-form";
import { usoAutenticacion } from "../context/ContextoAutenticacion";

function PaginaRegistro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registrarse, errores } = usoAutenticacion();

  const onSubmit = handleSubmit(async (values) => {
    values.numeroContacto = Number(values.numeroContacto);
    values.cedula = Number(values.cedula);
    values.esEstudiante = values.esEstudiante === "true";
    await registrarse(values);
  });

  return (
    <div className="flex h-full items-center justify-center bg-[#dddddb]">
      <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-full p-10 rounded-4xl border-2 h-full mt-5">
        {errores.map((error, i) => (
          <div
            className="bg-red-500 p-2 text-white text-center rounded-md my-2"
            key={i}
          >
            {error}
          </div>
        ))}
        <h1 className="text 2xl font-bold text-center">
          Registrar nueva cuenta
        </h1>
        <form
          className="grid grid-cols-2 gap-4 p-6 max-w-lg mx-auto"
          onSubmit={onSubmit}
        >
          <div className="col-span-2">
            <input
              type="email"
              {...register("correo", { required: true })}
              className="w-full text-black border-2 px-4 py-2 rounded-md my-2"
              placeholder="Correo"
            />
            {errors.correo && <p className="text-red-500">Correo requerido</p>}
          </div>
          <input
            type="text"
            {...register("usuario", { required: true })}
            className="w-full text-black border-2 px-4 py-2 rounded-md my-2"
            placeholder="Usuario"
          />
          <input
            type="password"
            {...register("clave", { required: true })}
            className="w-full text-black border-2 px-4 py-2 rounded-md my-2"
            placeholder="Clave"
          />
          {errors.usuario && <p className="text-red-500">Usuario requerido</p>}
          {errors.clave && <p className="text-red-500">Clave requerida</p>}

          <div className="col-span-2">
            <input
              type="text"
              {...register("nombre", { required: true })}
              className="w-full text-black border-2 px-4 py-2 rounded-md my-2"
              placeholder="Nombre"
            />
            {errors.nombre && <p className="text-red-500">Nombre requerido</p>}
          </div>
          <input
            type="number"
            {...register("cedula", { required: true })}
            className="w-full text-black border-2 px-4 py-2 rounded-md my-2"
            placeholder="Cedula"
          />
          <input
            type="number"
            {...register("numeroContacto", { required: true })}
            className="w-full text-black border-2 px-4 py-2 rounded-md my-2"
            placeholder="Telefono"
          />
          {errors.cedula && <p className="text-red-500">Cedula requerida</p>}
          {errors.numeroContacto && (
            <p className="text-red-500">Telefono requerido</p>
          )}

          <div className="col-span-2">
            <input
              type="text"
              {...register("direccionResidencia", { required: true })}
              className="w-full text-black border-2 px-4 py-2 rounded-md my-2"
              placeholder="Dirección De Residencia"
            />
            {errors.direccionResidencia && (
              <p className="text-red-500">
                La direccion de residencia es requerida
              </p>
            )}
          </div>
          <input
            type="text"
            {...register("eps", { required: true })}
            className="w-full text-black border-2 px-4 py-2 rounded-md my-2"
            placeholder="EPS"
          />
          <select
            {...register("esEstudiante", { required: true })}
            className="w-full text-black border-2 px-4 py-2 rounded-md my-2"
          >
            <option value="true">Estudiante</option>
            <option value="false">Maestro</option>
          </select>
          {errors.eps && <p className="text-red-500">La eps es requerida</p>}
          {errors.esEstudiante && (
            <p className="text-red-500">Selecciona un rol</p>
          )}

          <div className="flex justify-center items-center h-full">
            <button
              type="submit"
              className="bg-[#8b8a8a] rounded-md my-2 py-2 px-4 cursor-pointer"
            >
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaginaRegistro;
