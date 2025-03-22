function TarjetaTareaMini({urlImagen, titulo, descripcion}) {
    return (
        <div className="flex items-center bg-white shadow-md rounded-md overflow-hidden w-120 h-24">
        <img className="w-24 h-full object-cover p-4" src={urlImagen} alt="Imagen" />
        <div className="p-4">
          <h3 className="text-lg font-bold">{titulo}</h3>
          <p className="text-black text-sm">{descripcion}</p>
        </div>
      </div>
    );
  }
  export default TarjetaTareaMini;
  