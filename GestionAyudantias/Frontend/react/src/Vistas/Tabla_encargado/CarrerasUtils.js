const getFormattedCarrera = (selectedCarrera) => {
    if (selectedCarrera === "MEDICINA") {
      return "Medicina";
    } else if (selectedCarrera === "BACHILLERATO EN CIENCIAS BIOMÉDICAS") {
      return "Bachillerato En Ciencias Biomédicas";
    } else if (selectedCarrera === "BIOINGENIERÍA MÉDICA") {
      return "Bioingeniería Médica";
    } else if (selectedCarrera === "QUÍMICA Y FARMACIA") {
      return "Química Y Farmacia";
    } else if (selectedCarrera === "Arquitectura") {
      return "Arquitectura";
    } else if (selectedCarrera === "Ingeniería Civil en Informática") {
      return "Ingeniería Civil en Informática";
    } else if (selectedCarrera === "Ingenieria en Construcción") {
      return "Ingenieria en Construcción";
    } else if (selectedCarrera === "Ingeniería Civil Electrónica") {
      return "Ingeniería Civil Electrónica";
    } else if (selectedCarrera === "Ingeniería Civil") {
      return "Ingeniería Civil";
    } else if (selectedCarrera === "Construcción Civil (Vespertino)") {
      return "Construcción Civil (Vespertino)";
    } else if (selectedCarrera === "Ingeniería Civil Industrial") {
      return "Ingeniería Civil Industrial";
    } else if (selectedCarrera === "Ingenieria en Automatización y Control(Vespertino)") {
      return "Ingeniería En Automatización Y Control (Vespertino)";
    } else if (selectedCarrera === "Ingeniería Ejecución En Computación E Informática") {
      return "Ingeniería Ejecución En Computación E Informática";
    } else if (selectedCarrera === "Ingeniería Ejecución en Geomensura (Vespertino)") {
      return "Ingeniería Ejecución En Geomensura (Vespertino)";
    } else if (selectedCarrera === "Ingeniería en Ejecución Industrial") {
      return "Ingeniería en Ejecución Industrial";
    } else if (selectedCarrera === "Ingeniería de Ejecución en Administración de Empresas (Vespertino)") {
      return "Ingeniería De Ejecución En Administración De Empresas (Vespertino) [nueva]";
    } else if (selectedCarrera === "Administración Pública") {
      return "Administración Pública";
    } else if (selectedCarrera === "Contador Público y Auditor - Talca") {
      return "Contador Público Y Auditor - Talca";
    } else if (selectedCarrera === "Ingeniería Comercial") {
      return "Ingeniería Comercial";
    } else if (selectedCarrera === "Sociología") {
      return "Sociología";
    } else if (selectedCarrera === "Trabajo Social - Talca") {
      return "Trabajo Social - Talca";
    } else if (selectedCarrera === "Contador Auditor (Vespertino) [Sin acceso paes]") {
      return "Contador Auditor (Vespertino) [sin Acceso Paes]";
    } else if (selectedCarrera === "Pedagogía en Educación Especial - Talca") {
      return "Pedagogía En Educación Especial - Talca";
    } else if (selectedCarrera === "Pedagogía en Educación Física") {
      return "Pedagogía En Educación Física";
    } else if (selectedCarrera === "Pedagogía en Educación General básica con Mención - Sede Talca") {
      return "Pedagogía En Educación General Básica Con Mención - Sede Talca";
    } else if (selectedCarrera === "Pedagogía en Educación Parvularia con Mención - Talca") {
      return "Pedagogía En Educación Parvularia Con Mención - Talca";
    } else if (selectedCarrera === "Pedagogía En Historia, Geografía Y Ciencias Sociales") {
      return "Pedagogía En Historia, Geografía Y Ciencias Sociales";
    } else if (selectedCarrera === "Pedagogía En Inglés") {
      return "Pedagogía En Inglés";
    } else if (selectedCarrera === "Pedagogía En Lengua Castellana Y Comunicación") {
      return "Pedagogía En Lengua Castellana Y Comunicación";
    } else if (selectedCarrera === "Geología") {
      return "Geología";
    } else if (selectedCarrera === "Ingeniería en Estadística") {
      return "Ingeniería En Estadística";
    } else if (selectedCarrera === "Ingeniería Matemática") {
      return "Ingeniería Matemática";
    } else if (selectedCarrera === "Pedagogía En Ciencias") {
      return "Pedagogía En Ciencias";
    } else if (selectedCarrera === "Pedagogía En Matemática Y Computación") {
      return "Pedagogía En Matemática Y Computación";
    } else if (selectedCarrera === "Agronomía") {
      return "Agronomía";
    } else if (selectedCarrera === "Ingeniería En Biotecnología") {
      return "Ingeniería En Biotecnología";
    } else if (selectedCarrera === "Ingeniería En Recursos Naturales") {
      return "Ingeniería En Recursos Naturales";
    } else if (selectedCarrera === "Medicina Veterinaria") {
      return "Medicina Veterinaria";
    } else if (selectedCarrera === "Pedagogía En Religión Y Filosofia") {
      return "Pedagogía En Religión Y Filosofia";
    } else if (selectedCarrera === "Obstetricia Y Puericultura [Nueva]") {
      return "Obstetricia Y Puericultura [nueva]";
    } else if (selectedCarrera === "Enfermería - Talca") {
      return "Enfermería - Talca";
    } else if (selectedCarrera === "Kinesiología") {
      return "Kinesiología";
    } else if (selectedCarrera === "Nutrición Y Dietética") {
      return "Nutrición Y Dietética";
    } else if (selectedCarrera === "Psicología - Talca") {
      return "Psicología - Talca";
    } else if (selectedCarrera === "Tecnología Médica") {
      return "Tecnología Médica";
    } else if (selectedCarrera === "Terapia Ocupacional") {
      return "Terapia Ocupacional";
    }
    return selectedCarrera;
  };
  
  export default getFormattedCarrera;
  