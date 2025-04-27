import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProveedorAutenticacion } from "./context/ContextoAutenticacion";

import PaginaInicioSesion from "./pages/PaginaInicioSesion";
import PaginaRegistro from "./pages/PaginaRegistro";
import PaginaPerfil from "./pages/paginaPerfil";
import PaginaInicio from "./pages/PaginaInicio";
// Agregre esta linea para que haya pagina vivisble de recuperacion
import PaginaRestablecerContrasena from "./pages/PaginaRestablecerContrasena";

import RutasProtegidas from "./RutasProtegidas";
import ProteccionRutaRegistro from "./ProteccionRutaRegistro";
import ProteccionRutaIniciarSesion from "./ProteccionRutaIniciar-Sesion";
import ProteccionRutaPerfil from "./ProteccionRutaPerfil";
import Encabezado from "./components/Encabezado";
//Agregamos esta proteccion para la ruta de restablecer contraseña
//import ProteccionRutaRestablecerContrasena from "./ProteccionRutaRestablecerContrasena";


function App() {
  return (
    <ProveedorAutenticacion>
      <BrowserRouter>
      <Encabezado/>
        <Routes>
          {/* Esta es la cosa para agregar paginas sin asegurar solo con el enlace en path*/}
          <Route path="/" element={<PaginaInicio />} />
          
          <Route element={<ProteccionRutaIniciarSesion />}>
            <Route path="/iniciar-sesion" element={<PaginaInicioSesion />} />
            {/* se agreag aca, para que solo se puede acceder si no se ha inicado sesion*/}
            <Route path="/restablecer-contrasena" element={<PaginaRestablecerContrasena />} />
          </Route>


          {/* Esta es la cosa para agregar paginas protegiendo y forzando estar logeado para ver */}
          <Route element={<RutasProtegidas />}>
            <Route element={<ProteccionRutaRegistro />}>
              <Route path="/registro" element={<PaginaRegistro />} />
            </Route>
            <Route element={<ProteccionRutaPerfil />}>
              <Route path="/perfil" element={<PaginaPerfil />} />
            </Route>
            {/*  <Route path="/restablecer-contrasena" element={<PaginaRestablecerContrasena />} /> */}
           
          </Route>
        </Routes>
      </BrowserRouter>
    </ProveedorAutenticacion>
  );
}

export default App;
