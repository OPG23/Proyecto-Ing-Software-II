import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProveedorAutenticacion } from "./context/ContextoAutenticacion";
import { ProveedorTarea } from "./context/ContextoTarea";
import { ProveedorEntrega } from "./context/ContextoEntrega";

import PaginaInicioSesion from "./pages/PaginaInicioSesion";
import PaginaRegistro from "./pages/PaginaRegistro";
import PaginaPerfil from "./pages/paginaPerfil";
import PaginaRestablecerContrasena from "./pages/PaginaRestablecerContrasena";

import PaginaEntregaTareas from "./pages/PaginaEntregaTareas";
import PaginaListaTareas from "./pages/PaginaListaTareas";
import PaginaCrearTarea from "./pages/PaginaCrearTarea";
import PaginaEditarTarea from "./pages/PaginaEditarTarea";
import PaginaTareasProfesor from "./pages/PaginaTareasProfesor";
import PaginaEntregasProfesor from "./pages/PaginaEntregasProfesor";

import SubirCuestionario from "./pages/SubirCuestionario";
import MisCuestionariosProfesor from "./pages/MisCuestionariosProfesor";
import VerCuestionarios from "./pages/VerCuestionarios";
import ResponderCuestionario from "./pages/ResponderCuestionario";
import VerRespuestasProfesor from "./pages/VerRespuestasProfesor";
import EvaluarRespuestaEstudiante from "./pages/EvaluarRespuestaEstudiante";

import RutasProtegidas from "./RutasProtegidas";
import ProteccionRutaRegistro from "./ProteccionRutaRegistro";
import ProteccionRutaIniciarSesion from "./ProteccionRutaIniciar-Sesion";
import ProteccionRutaPerfil from "./ProteccionRutaPerfil";
import ProteccionRutasProfesores from "./ProteccionRutasProfesores";
import ProteccionRutasEstudiantes from "./ProteccionRutasEstudiantes";

import Navegacion from "./layouts/Navegacion";
import fondo from "/imagenFondoInicioSesion.png";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <ProveedorAutenticacion>
        <ProveedorTarea>
          <ProveedorEntrega>
            <BrowserRouter>
              <Navegacion />
              <Routes>

                {/* Rutas públicas si no hay sesión iniciada */}
                <Route element={<ProteccionRutaIniciarSesion />}>
                  <Route path="/" element={<PaginaInicioSesion />} />
                  <Route path="/restablecer-contrasena" element={<PaginaRestablecerContrasena />} />
                </Route>

                {/* Rutas protegidas: requieren sesión */}
                <Route element={<RutasProtegidas />}>

                  <Route element={<ProteccionRutaRegistro />}>
                    <Route path="/registro" element={<PaginaRegistro />} />
                  </Route>

                  <Route element={<ProteccionRutaPerfil />}>
                    <Route path="/perfil" element={<PaginaPerfil />} />
                    
                    {/* Rutas de cuestionarios */}
                    <Route path="/cuestionarios" element={<SubirCuestionario />} />
                    <Route path="/mis-cuestionarios" element={<MisCuestionariosProfesor />} />
                    <Route path="/ver-cuestionarios" element={<VerCuestionarios />} />
                    <Route path="/responder-cuestionario/:id" element={<ResponderCuestionario />} />
                    <Route path="/ver-respuestas/:id" element={<VerRespuestasProfesor />} />
                    <Route path="/evaluar-respuesta/:id" element={<EvaluarRespuestaEstudiante />} />
                  </Route>

                  {/* Rutas de estudiantes */}
                  <Route element={<ProteccionRutasEstudiantes />}>
                    <Route path="/entregar_tarea" element={<PaginaEntregaTareas />} />
                    <Route path="/lista_tareas" element={<PaginaListaTareas />} />
                  </Route>

                  {/* Rutas de profesores */}
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
