import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProveedorAutenticacion } from "./context/ContextoAutenticacion";
import { ProveedorTarea } from "./context/ContextoTarea";
import { ProveedorEntrega } from "./context/ContextoEntrega";
import PaginaInicioSesion from "./pages/PaginaInicioSesion";
import PaginaRegistro from "./pages/PaginaRegistro";
import PaginaPerfil from "./pages/paginaPerfil";
import PaginaEntregaTareas from "./pages/PaginaEntregaTareas";
import PaginaListaTareas from "./pages/PaginaListaTareas";
import PaginaCrearTarea from "./pages/PaginaCrearTarea"; //revisar
import PaginaEditarTarea from "./pages/PaginaEditarTarea";
import PaginaTareasProfesor from "./pages/PaginaTareasProfesor";
import PaginaEntregasProfesor from "./pages/PaginaEntregasProfesor.jsx";

import RutasProtegidas from "./RutasProtegidas";
import ProteccionRutaRegistro from "./ProteccionRutaRegistro";
import ProteccionRutaIniciarSesion from "./ProteccionRutaIniciar-Sesion";
import ProteccionRutaPerfil from "./ProteccionRutaPerfil";
import ProteccionRutasProfesores from "./ProteccionRutasProfesores"
import ProteccionRutasEstudiantes from "./ProteccionRutasEstudiantes"
import Navegacion from "./layouts/Navegacion";
import fondo from '/imagenFondoInicioSesion.png';

function App() {
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" 
    style={{ backgroundImage: `url(${fondo})` }}>
      <ProveedorAutenticacion>
        <ProveedorTarea>
          <ProveedorEntrega>
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
                  <Route element={<ProteccionRutasEstudiantes />}>
                    <Route path="/entregar_tarea" element={<PaginaEntregaTareas />} />
                    <Route path="/lista_tareas" element={<PaginaListaTareas />} />
                  </Route>
                  <Route element={<ProteccionRutasProfesores />}> 
                    <Route path="/crear_tarea" element={<PaginaCrearTarea />} />
                    <Route path="/editar_tarea" element={<PaginaEditarTarea />} />
                    <Route path="/tareas_profesor" element={<PaginaTareasProfesor />} />
                    <Route path="/entregas_tarea" element={<PaginaEntregasProfesor />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </ProveedorEntrega>
        </ProveedorTarea>
      </ProveedorAutenticacion>
    </div>
  );
}

export default App;
