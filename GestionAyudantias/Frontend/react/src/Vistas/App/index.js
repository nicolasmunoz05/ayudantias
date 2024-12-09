import React from "react";
import { BrowserRouter, useRoutes, Navigate} from "react-router-dom";
import Login from "../Login/index.js";
import Estudiante from "../Estudiante/index.js";
import Encargado from "../Encargado/index.js";
import AdminEstudiante from "../Admin/adminestudiante.js";
import AdminEncargado from "../Admin/adminencargado.js";
import AdminFacultad from "../Admin/adminfacultad.js";
import AdminRamo from "../Admin/adminramo.js";
import AdminCarrera from "../Admin/admincarrera.js";
import AdminAdmin from "../Admin/adminadmin.js";
import AdminPostulacion from "../Admin/adminpostulacion.js";
import AdminResultado from "../Admin/adminresultado.js";
import CompCreateEstudiante from "../Admin/CreateEstudiante.js";
import CompEditEstudiante from "../../Vistas/Admin/EditEstudiante.js";
import CompCreatePostulacion from "../Admin/CreatePostulacion.js";
import CompEditPostulacion from "../../Vistas/Admin/EditPostulacion.js";
import CompCreateResultado from "../Admin/CreateResultado.js";
import CompEditResultado from "../../Vistas/Admin/EditResultado.js";
import CompEditRamo from "../../Vistas/Admin/EditRamo.js";
import CompCreateRamo from "../../Vistas/Admin/CreateRamo.js";
import CompEditCarrera from "../Admin/EditCarrera.js";
import CompCreateCarrera from "../Admin/CreateCarrera.js";
import CompEditFacultad from "../../Vistas/Admin/EditFacultad.js";
import CompCreateFacultad from "../../Vistas/Admin/CreateFacultad.js";
import CompEditAdmin from "../../Vistas/Admin/EditAdmin.js";
import CompCreateAdmin from "../../Vistas/Admin/CreateAdmin.js";
import CompEditEncargado from "../../Vistas/Admin/EditEncargado.js";
import CompCreateEncargado from "../../Vistas/Admin/CreateEncargado.js";
import Encargadoxdd from "../../Momentaneo/Encargadoxdd.js";
import Educacion from "../E_Educacion/Index.js";
import EMedicina from "../E_Medicina/Index.js";
import EIngenieria from "../E_Ingenieria/Index.js";
import EBasicas from "../E_Basicas/Index.js";
import ESociales from "../E_Sociales/Index.js";
import ESalud from "../E_Salud/Index.js";
import EAgraria from "../E_Agraria/Index.js";
import EReligion from "../E_Religion/Index.js";
// import TablaPostulantes from "../Encargado";
import Vpostulacion from "../Estudiante/Vpostulacion.js";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Encargado from '../Encargado'
//import CompShowEstudiante from '../../estudiante/ShowEstudiante';
import VistaPreguntas from "../../Componentes/componentes-estudiantes/PreguntasRespuestas/preguntas.js";
import VerResultados from "../../Componentes/componentes-estudiantes/VerResultados/VerResultados.js"

const AppRutas = () =>
  useRoutes([
    { path: "/", element: <Navigate to="/login" /> },
    { path: "/login", element: <Login /> },
    { path: "/sign-in", element: <Login /> },
    { path: "/estudiante", element: <Estudiante /> },
    { path: "/encargado/", element: <Encargadoxdd /> },
    { path: "/encargado/:rut_evaluador", element: <Encargado /> },
    { path: "/encargado142562369", element: <EMedicina /> },
    { path: "/encargado623545233", element: <EIngenieria /> },
    { path: "/encargado122956847", element: <EBasicas /> },
    { path: "/encargado201712513", element: <Educacion /> },
    { path: "/encargado201792513", element: <ESociales /> },
    { path: "/encargado201359027", element: <ESalud /> },
    { path: "/encargado207410935", element: <EAgraria /> },
    { path: "/encargado207892351", element: <EReligion /> },
    { path: "/admin/estudiante", element: <AdminEstudiante /> },
    { path: "/admin/postulacion", element: <AdminPostulacion /> },
    { path: "/admin/resultado", element: <AdminResultado /> },
    { path: "/admin/admin", element: <AdminAdmin /> },
    { path: "/admin/encargado", element: <AdminEncargado /> },
    { path: "/admin/facultad", element: <AdminFacultad /> },
    { path: "/admin/ramo", element: <AdminRamo /> },
    { path: "/admin/carrera", element: <AdminCarrera /> },
    { path: "/admin/crear_estudiante", element: <CompCreateEstudiante /> },
    { path: "/admin/editar_estudiante/:id_estudiante",element: <CompEditEstudiante />,},
    { path: "/admin/crear_postulacion", element: <CompCreatePostulacion /> },
    { path: "/admin/editar_postulacion/:id",element: <CompEditPostulacion />,},
    { path: "/admin/crear_resultado", element: <CompCreateResultado /> },
    { path: "/admin/editar_resultado/:id",element: <CompEditResultado />,},
    { path: "/admin/crear_ramo", element: <CompCreateRamo /> },
    { path: "/admin/editar_ramo/:id", element: <CompEditRamo /> },
    { path: "/admin/crear_carrera", element: <CompCreateCarrera /> },
    { path: "/admin/editar_carrera/:id", element: <CompEditCarrera /> },
    { path: "/admin/crear_facultad", element: <CompCreateFacultad /> },
    { path: "/admin/editar_facultad/:id", element: <CompEditFacultad /> },
    { path: "/admin/crear_administrador", element: <CompCreateAdmin /> },
    { path: "/admin/editar_administrador/:id_administrador",element: <CompEditAdmin />,},
    { path: "/admin/crear_encargado", element: <CompCreateEncargado /> },
    { path: "/admin/editar_encargado/:id_evaluador",element: <CompEditEncargado />,},
    { path: "/estudiante/FormularioE", element: <Vpostulacion /> },
    { path: "/estudiante/Preguntas", element: <VistaPreguntas /> },
    { path: "/estudiante/resultados", element: <VerResultados /> },
  ]);

function App() {
  return ( 
    <BrowserRouter>
      <AppRutas />
    </BrowserRouter>
  );
}

export default App;