import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProveedorAutenticacion } from "./context/ContextoAutenticacion";
import PaginaInicioSesion from "./pages/PaginaInicioSesion";
import PaginaRegistro from "./pages/PaginaRegistro";
import PaginaPerfil from "./pages/paginaPerfil";
import PaginaInicio from "./pages/PaginaInicio";

import RutasProtegidas from "./RutasProtegidas";
import ProteccionRutaRegistro from "./ProteccionRutaRegistro";
import ProteccionRutaIniciarSesion from "./ProteccionRutaIniciar-Sesion";
import ProteccionRutaPerfil from "./ProteccionRutaPerfil";
import Encabezado from "./components/Encabezado";

function App() {
  return (
    <ProveedorAutenticacion>
      <BrowserRouter>
      <Encabezado/>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route element={<ProteccionRutaIniciarSesion />}>
            <Route path="/iniciar-sesion" element={<PaginaInicioSesion />} />
          </Route>

          <Route element={<RutasProtegidas />}>
            <Route element={<ProteccionRutaRegistro />}>
              <Route path="/registro" element={<PaginaRegistro />} />
            </Route>
            <Route element={<ProteccionRutaPerfil />}>
              <Route path="/perfil" element={<PaginaPerfil />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ProveedorAutenticacion>
  );
}

export default App;
