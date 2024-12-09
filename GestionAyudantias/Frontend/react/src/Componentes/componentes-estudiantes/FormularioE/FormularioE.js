import React, { useState, useEffect } from 'react';
import axios from '../../../Momentaneo/Axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './FormularioE.css';

const FormularioEstudiante = () => {
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [rutEstudiante, setRutEstudiante] = useState('');
  const [carreraEstudiante, setCarreraEstudiante] = useState('');
  const [SeleccionarRamo, setSeleccionarRamo] = useState('');
  const [promedioRamo, setPromedioRamo] = useState('');
  const [ramos, setRamos] = useState([]);
  const [idRamo, setIdRamo] = useState('');
  const [idPeriodo, setIdPeriodo] = useState('');
  const [horasSolicitudAyudantia, setHorasSolicitudAyudantia] = useState('');
  const [mostrarError, setMostrarError] = useState(false);

  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      axios.get(`http://localhost:8000/estudiante2/${username}`)
        .then((response) => {
          const data = response.data;
          console.log(response.data);
          setNombreEstudiante(`${data.estudiante.nombres_estudiante} ${data.estudiante.apellido1_estudiante} ${data.estudiante.apellido2_estudiante}`);
          setRutEstudiante(data.estudiante.rut_estudiante);
          setCarreraEstudiante(data.carrera.nombre_carrera);
          setRamos(data.ramos);
        })
        .catch((error) => {
          console.error('Error al obtener los datos del servidor:', error);
        });
    }
  }, []);

  const handleSelectChange = (selectedRamo) => {
    const selectedRamoData = ramos.find(ramo => ramo.nombre_ramo === selectedRamo);

    if (selectedRamoData) {
      const idRamo = selectedRamoData.id_ramo;
      const idPeriodo = selectedRamoData.id_periodo;
      const horasSolicitudAyudantia = selectedRamoData.horas_ayudantia_ramo;

      const promedio = selectedRamoData.detalle_estudiante_ramos[0].nota_ramo;
      if (promedio !== null) {
        setPromedioRamo(promedio);
      } else {
        setPromedioRamo('');
      }

      setSeleccionarRamo(selectedRamo);
      setIdRamo(idRamo);
      setIdPeriodo(idPeriodo);
      setHorasSolicitudAyudantia(horasSolicitudAyudantia);
      setMostrarError(false); // Resetear el estado de mostrarError cuando se selecciona una asignatura
    } else {
      setPromedioRamo('');
      setIdRamo('');
      setIdPeriodo('');
      setHorasSolicitudAyudantia('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!SeleccionarRamo) {
      setMostrarError(true); // Mostrar el error antes de la alerta
      alert('Debes seleccionar una asignatura para enviar la postulación.');
      return; // No proceder con el envío si no se ha seleccionado una asignatura
    }

    const confirmacion = window.confirm('¿Estás seguro de enviar la postulación?');

    if (confirmacion) {
      const postData = {
        id_postulacion:  username /2 + Math.floor(Math.random() * 10)+1,
        rut_estudiante: rutEstudiante,
        ramo_seleccionado: SeleccionarRamo,
        promedio_ramo: promedioRamo,
        id_ramo: idRamo,
        id_periodo: idPeriodo,
        horas_solicitud_ayudantia: horasSolicitudAyudantia,
      };

      axios.post(`http://localhost:8000/Estudiante2/${username}`, postData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error al crear la postulación:', error);
        });

      const realizarOtraPostulacion = window.confirm('Usted ha postulado correctamente. ¿Desea postular a otra asignatura?');
      if (realizarOtraPostulacion) {
        // Reiniciar el formulario
        setSeleccionarRamo('');
        setPromedioRamo('');
        setIdRamo('');
        setIdPeriodo('');
        setHorasSolicitudAyudantia('');
        setMostrarError(false);
      } else {
        navigate('/estudiante/');
      }
    } else {
      console.log('Operación cancelada');
    }
  };

  const handleCancelarClick = () => {
    const confirmacionCancelar = window.confirm('¿Estás seguro de que deseas cancelar?');

    if (confirmacionCancelar) {
      navigate('/estudiante/');
    }
  };

  return (
    <div className="container">
      <h1>Postulación</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <div className="col">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombreEstudiante}
              readOnly
            />
          </div>
          <div className="col">
            <label htmlFor="rut">Rut</label>
            <input
              type="text"
              className="form-control"
              id="rut"
              value={rutEstudiante}
              readOnly
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="carreraEstudiante">Carrera del Estudiante</label>
          <input
            type="text"
            className="form-control"
            id="carreraEstudiante"
            value={carreraEstudiante}
            readOnly
          />
        </div>
        <div className={`mb-3 ${mostrarError ? 'asignatura-no-seleccionada' : ''}`}>
          <label htmlFor="carrera">Asignatura</label>
          <select
            className={`form-control ${mostrarError ? 'input-rojo' : ''}`}
            id="carrera"
            value={SeleccionarRamo}
            onChange={(e) => handleSelectChange(e.target.value)}
          >
            <option value="">Asignaturas disponibles para Ayudantía</option>
            {ramos.map((ramo, index) => (
              <option key={index} value={ramo.nombre_ramo}>
                {ramo.nombre_ramo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3 row">
          <div className="col">
            <label htmlFor="promedioRamo">Promedio de Ramo</label>
            <input
              type="text"
              className="form-control"
              id="promedioRamo"
              value={promedioRamo}
              readOnly
            />
          </div>
          <div className="col">
            <label htmlFor="horasSolicitudAyudantia">Horas de Ayudantía</label>
            <input
              type="text"
              className="form-control"
              id="horasSolicitudAyudantia"
              value={horasSolicitudAyudantia}
              readOnly
            />
          </div>
        </div>





        <div className="mb-3 d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
          <button type="button" className="btn btn-secondary btn-cancelar" onClick={handleCancelarClick}>
            Cancelar
          </button>
        </div>
      </form>
      <div className="d-grid gap-2 col-6 mx-auto">
        <NavLink to="/estudiante/preguntas">
        <button className="btn btn-primary btn-preguntas" type="button">
          Si tienes preguntas o dudas, haz click aquí
        </button>
        </NavLink>
      </div>
    </div>
  );
};

export default FormularioEstudiante;
