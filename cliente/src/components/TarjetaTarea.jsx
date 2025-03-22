function TarjetaTarea({urlImagen, titulo, descripcion}) {
  return (
    <div className="bg-[#D1D1D1] w-77 h-65 relative max-w-sm rounded-2xl overflow-hidden">
      <img
        className="h-20 absolute right-28.5 top-4/17 "
        src={urlImagen}
        alt="Imagen de la tarjeta"
      />
      <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-90 p-4 shadow-md">
        <h3 className="text-lg font-bold">{titulo}</h3>
        <p className="text-gray-700 text-sm">{descripcion}</p>
      </div>
    </div>
  );
}
export default TarjetaTarea;
