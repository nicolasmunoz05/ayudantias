// opcionesMenu.js
export const opcionesMenu = {
    Admin: [
        { label: "Administradores", route: "/admin/admin" },
        { label: "Carreras", route: "/admin/carrera" },
        { label: "Encargados", route: "/admin/encargado" },
        { label: "Estudiantes", route: "/admin/estudiante" },
        { label: "Facultades", route: "/admin/facultad" },
        { label: "Ramos", route: "/admin/ramo" },
        { label: "Postulaciones", route: "/admin/postulacion" },
        { label: "Resultados", route: "/admin/resultado" },

    ],
    Encargado: [
        { label: "Opción 1 para Encargado", route: "#" },
        { label: "Opción 2 para Encargado", route: "#" },

    ],
    Estudiante: [
        { label: "Inicio", route: "/Estudiante" },
        { label: "Realizar postulación", route: "/Estudiante/FormularioE" },
        { label: "Resultados de la postulación", route: "/Estudiante/resultados" },
        { label: "Preguntas Frecuentes", route: "/Estudiante/Preguntas" },

    ],
};
