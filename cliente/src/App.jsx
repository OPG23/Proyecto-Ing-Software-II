import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProveedorAutenticacion } from "./context/ContextoAutenticacion";
import PaginaInicioSesion from "./pages/PaginaInicioSesion";
import PaginaRegistro from "./pages/PaginaRegistro";
import PaginaPerfil from "./pages/paginaPerfil";
import PaginaEntregaTareas from "./pages/PaginaEntregaTareas";
import PaginaListaTareas from "./pages/PaginaListaTareas";

import RutasProtegidas from "./RutasProtegidas";
import ProteccionRutaRegistro from "./ProteccionRutaRegistro";
import ProteccionRutaIniciarSesion from "./ProteccionRutaIniciar-Sesion";
import ProteccionRutaPerfil from "./ProteccionRutaPerfil";
import ProteccionRutaEntregas from "./ProteccionRutaEntregas";
import ProteccionRutaListaTareas from "./ProteccionRutaListaTareas";
import Navegacion from "./layouts/Navegacion";
import fondo from '/imagenFondoInicioSesion.png';

function App() {
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" 
    style={{ backgroundImage: `url(${fondo})` }}>
      <ProveedorAutenticacion>
        <BrowserRouter>
          <Navegacion />
          <Routes>
            <Route element={<ProteccionRutaIniciarSesion />}>
              <Route path="/" element={<PaginaInicioSesion />} />
            </Route>
            <Route element={<RutasProtegidas />}>
              <Route element={<ProteccionRutaRegistro />}>
                <Route path="/registro" element={<PaginaRegistro />} />
              </Route>
              <Route element={<ProteccionRutaPerfil />}>
                <Route path="/perfil" element={<PaginaPerfil />} />
              </Route>
              <Route element={<ProteccionRutaEntregas />}>
                <Route path="/entregar_tarea" element={<PaginaEntregaTareas />} />
              </Route>
              <Route element={<ProteccionRutaListaTareas />}>
                <Route path="/lista_tareas" element={<PaginaListaTareas />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ProveedorAutenticacion>
    </div>
  );
}

export default App;
