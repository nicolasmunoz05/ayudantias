import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Momentaneo/Axios';
import ReactPaginate from 'react-paginate';
import Navbar from '../../Componentes/Navbar';
import Foooter from '../../Componentes/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css';
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/carrera/';

const Carreras = () => {
  const { showNotification } = useNotification();
  const [carreras, setCarreras] = useState([]);
  const [filteredCarreras, setFilteredCarreras] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const carrerasPerPage = 10;
  const [facultadesInfo, setFacultadesInfo] = useState({});

  useEffect(() => {
    getCarreras();
  }, []);

  const getCarreras = async () => {
    const res = await axios.get(URI);
    setCarreras(res.data);
  };

  const deleteCarrera = async (id_carrera) => {
    const carreraToDelete = carreras.find(carrera => carrera.id_carrera === id_carrera);
    const confirmDelete = window.confirm(`¿Está seguro de que desea eliminar ${carreraToDelete.nombre_carrera}?`);

    if (confirmDelete) {
    await axios.delete(`${URI}${id_carrera}`);
    getCarreras();
    showNotification(`Carrera "${carreraToDelete.nombre_carrera}" eliminada exitosamente`, 'error',{
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
  });
  };
};

useEffect(() => {
  // Realizar la solicitud para obtener la información de todos los estudiantes
  const fetchFacultadesInfo = async () => {
      try {
          const res = await axios.get('http://localhost:8000/admin/facultad/');
          const facultadesInfo = res.data.reduce((map, facultad) => {
              map[facultad.id_facultad] = {
                  nombreF: facultad.nombre_facultad,
              };
              return map;
          }, {});
          setFacultadesInfo(facultadesInfo);
      } catch (error) {
          console.error('Error al cargar información de facultades:', error);
      }
  };
  // Llamar a la función al montar el componente
  fetchFacultadesInfo();
}, []); // Asegúrate de que este array de dependencias esté vacío para que se ejecute solo una vez


  useEffect(() => {
    const filtered = carreras.filter(
      (carrera) =>
        carrera.nombre_carrera.toLowerCase().includes(searchTerm.toLowerCase())
      // Agrega más condiciones de filtrado según las columnas que desees
    );
    setFilteredCarreras(filtered);
    setCurrentPage(0);
  }, [searchTerm, carreras]);

  // Calcular el índice de inicio y fin de la página actual después de la búsqueda
  const indexOfLastCarrera = (currentPage + 1) * carrerasPerPage;
  const indexOfFirstCarrera = indexOfLastCarrera - carrerasPerPage;
  const currentCarreras = filteredCarreras.slice(indexOfFirstCarrera, indexOfLastCarrera);

  return (
    <div className="admin-container">
      <Navbar />
      <p className="text-center" style={{ fontSize: '25px' }}>
        Bienvenido, Admin. Administre los datos.
      </p>

      <div className="container" style={{ marginBottom: '8px' }}>
        <h1>Carreras</h1>
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
        <Link to={`/admin/crear_carrera`} className='btn btn-success'>
            Crear
          </Link>
        <table className="table table-striped">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>ID Facultad</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentCarreras.map((carrera) => (
              <tr key={carrera.id_carrera}>
                <td>{carrera.id_carrera}</td>
                

                <td>[{carrera.id_facultad}] {facultadesInfo[carrera.id_facultad]?.nombreF}</td>


                <td>{carrera.nombre_carrera}</td>
                <td>
                  <Link to={`/admin/editar_carrera/${carrera.id_carrera}`} className="btn btn-primary btn-sm me-2">
                    Editar
                  </Link>
                  <button onClick={() => deleteCarrera(carrera.id_carrera)} className="btn btn-danger btn-sm">
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
          pageCount={Math.ceil(filteredCarreras.length / carrerasPerPage)}
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
  );
};

export default Carreras;
