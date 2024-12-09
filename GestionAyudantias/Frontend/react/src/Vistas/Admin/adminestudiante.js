import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from '../../Momentaneo/Axios';
import { Link } from 'react-router-dom';
import Navbar from '../../Componentes/Navbar';
import Foooter from '../../Componentes/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/estudiante/';

function Estd() {
  const { showNotification } = useNotification();
  const [estudiantes, setEstudiantes] = useState([]);
  const [filteredEstudiantes, setFilteredEstudiantes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const studentsPerPage = 10;
  const [carrerasInfo, setCarrerasInfo] = useState({});
  const [periodosInfo, setPeriodosInfo] = useState({});

  useEffect(() => {
    getEstudiantes();
  }, []);

  const getEstudiantes = async () => {
    const res = await axios.get(URI);
    setEstudiantes(res.data);
  };

  const deleteEstudiante = async (rut_estudiante) => {
    const estudianteToDelete = estudiantes.find(estudiante => estudiante.rut_estudiante === rut_estudiante);
    const confirmDelete = window.confirm(`¿Está seguro de que desea eliminar a ${estudianteToDelete.nombres_estudiante} ${estudianteToDelete.apellido1_estudiante} ${estudianteToDelete.apellido2_estudiante}?`);
    if (confirmDelete) {
    await axios.delete(`/admin/estudiante/${rut_estudiante}`);
    getEstudiantes();

    showNotification(`Estudiante "${estudianteToDelete.nombres_estudiante} ${estudianteToDelete.apellido1_estudiante}" eliminado exitosamente`,'error', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
  });
  }
  };
  useEffect(() => {
    // Realizar la solicitud para obtener la información de todos los estudiantes
    const fetchCarrerasInfo = async () => {
        try {
            const res = await axios.get('http://localhost:8000/admin/carrera/');
            const carrerasInfo = res.data.reduce((map, carrera) => {
                map[carrera.id_carrera] = {
                    nombreC: carrera.nombre_carrera,
                };
                return map;
            }, {});
            setCarrerasInfo(carrerasInfo);
        } catch (error) {
            console.error('Error al cargar información de carreras:', error);
        }
    };
    // Llamar a la función al montar el componente
    fetchCarrerasInfo();
  }, []); // Asegúrate de que este array de dependencias esté vacío para que se ejecute solo una vez
  

  useEffect(() => {
    const filtered = estudiantes.filter(
      (estudiante) =>
        estudiante.nombres_estudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.apellido1_estudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.apellido2_estudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.rut_estudiante.toString().includes(searchTerm)
      // Agrega más condiciones de filtrado según las columnas que desees
    );
    setFilteredEstudiantes(filtered);
    setCurrentPage(0);
  }, [searchTerm, estudiantes]);

  useEffect(() => {
    // Realizar la solicitud para obtener la información de todos los periodos
    const fetchPeriodosInfo = async () => {
        try {
            const res = await axios.get('http://localhost:8000/admin/periodo/');
            const periodosInfo = res.data.reduce((map, periodo) => {
                map[periodo.id_periodo] = {
                    añoP: periodo.año_periodo,
                    semP: periodo.semestre_periodo,
                };
                return map;
            }, {});
            setPeriodosInfo(periodosInfo);
        } catch (error) {
            console.error('Error al cargar información de periodos:', error);
        }
    };
    // Llamar a la función al montar el componente
    fetchPeriodosInfo();
  }, []); // Asegúrate de que este array de dependencias esté vacío para que se ejecute solo una vez

  const handleClick = async () => {
    try {
        const response = await fetch('http://localhost:5000/estudiantes_generar_csv', {
            method: 'GET',
            mode: 'cors',  // Usa el modo cors
        });
        const blob = await response.blob();

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([blob]));
        link.download = 'reporte_estudiantes_admin.csv';
        link.click();

        window.URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('Error al llamar a generar_csv:', error);
    }
};
  

  // Calcular el índice de inicio y fin de la página actual después de la búsqueda
  const indexOfLastEstudiante = (currentPage + 1) * studentsPerPage;
  const indexOfFirstEstudiante = indexOfLastEstudiante - studentsPerPage;
  const currentEstudiantes = filteredEstudiantes.slice(indexOfFirstEstudiante, indexOfLastEstudiante);

  return (
    <div className='admin-container'>
      <div className="tabla-estudiantes">
        <Navbar />
        <p className="text-center" style={{ fontSize: '25px', padding: '10px' }}>
          Bienvenido, Admin. Administre los datos.
        </p>

        <div className="container" style={{ marginBottom: '80px' }}>
          <h1>Estudiantes</h1>
          <div className="mb-1">
            <label htmlFor="search" className="form-label">
              Buscar:
            </label>
            <input
              type="text"
              id="search"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to={`/admin/crear_estudiante`} className='btn btn-success mb-1 mr-1'>
            Crear
          </Link>
          <button className='btn btn-secondary mb-1 mr-1' onClick={handleClick}>Generar Reporte</button> 
          <table className='table table-striped'>
            <thead className='table-primary'>
            <tr>
                                <th>Rut</th>
                                <th>ID Carrera</th>
                                <th>ID Rol</th>
                                <th>ID Periodo</th>
                                <th>Nombres</th>
                                <th>Apellido Paterno</th>
                                <th>Apellido Materno</th>
                                <th>Correo Institucional</th>
                                <th>Contraseña</th>
                                <th>PPA</th>
                                <th>Año Ingreso</th>
                                <th>Horas de Ayudantia</th>
                                <th>Gestionar</th>
                            </tr>
            </thead>
            <tbody>
              {currentEstudiantes.map((estudiante) => (
                <tr key={estudiante.rut_estudiante}>
                                    <td>{estudiante.rut_estudiante}</td>
                                    <td>[{estudiante.id_carrera}] {carrerasInfo[estudiante.id_carrera]?.nombreC}</td>
                                    <td>{estudiante.id_rol}</td>
                                    <td>[{estudiante.id_periodo}] {periodosInfo[estudiante.id_periodo]?.añoP}/{periodosInfo[estudiante.id_periodo]?.semP}</td>
                                    <td>{estudiante.nombres_estudiante}</td>
                                    <td>{estudiante.apellido1_estudiante}</td>
                                    <td>{estudiante.apellido2_estudiante}</td>
                                    <td>{estudiante.correo_institucional_estudiante}</td>
                                    <td>{estudiante.contraseña_estudiante}</td>
                                    <td>{estudiante.ppa_estudiante}</td>
                                    <td>{estudiante.año_ingreso_estudiante}</td>
                                    <td>{estudiante.horas_ayudantia_estudiante}</td>
                                    <td>
                                    <Link
                                            to={`/admin/editar_estudiante/${estudiante.rut_estudiante}`}
                                            className="btn btn-primary"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => deleteEstudiante(estudiante.rut_estudiante)}
                                            className="btn btn-danger"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Siguiente'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(filteredEstudiantes.length / studentsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
        <div style={{ marginBottom: '80px' }}></div>

        <Foooter />
      </div>
    </div>
  );
}

export default Estd;
