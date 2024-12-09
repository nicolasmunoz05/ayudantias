import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Momentaneo/Axios';
import ReactPaginate from 'react-paginate';
import Navbar from '../../Componentes/Navbar';
import Foooter from '../../Componentes/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css'; // Asegúrate de haber importado correctamente los estilos del admin
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/ramo/';

const Estd = () => {
  const { showNotification } = useNotification();
  const [ramos, setRamos] = useState([]);
  const [filteredRamos, setFilteredRamos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const ramosPerPage = 10;
  const [carrerasInfo, setCarrerasInfo] = useState({});
  const [periodosInfo, setPeriodosInfo] = useState({});

  useEffect(() => {
    getRamos();
  }, []);

  useEffect(() => {
    // Filtrar ramos cuando cambia el término de búsqueda
    const filtered = ramos.filter(
      (ramo) =>
        ramo.nombre_ramo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ramo.id_ramo.toLowerCase().includes(searchTerm.toLowerCase())
        // Agrega más condiciones de filtrado según las columnas que desees
    );
    setFilteredRamos(filtered);
    setCurrentPage(0); // Reiniciar la página actual al cambiar el término de búsqueda
  }, [searchTerm, ramos]);

  const getRamos = async () => {
    const res = await axios.get(URI);
    setRamos(res.data);
  };

  const deleteRamo = async (id_ramo) => {
    const ramosToDelete = ramos.find(ramo => ramo.id_ramo === id_ramo);
    const confirmDelete = window.confirm(`¿Está seguro de que desea eliminar ${ramosToDelete.nombre_ramo}?`);

    if (confirmDelete) {
    await axios.delete(`${URI}${id_ramo}`);
    getRamos();

    showNotification(`Ramo "${ramosToDelete.nombre_ramo}" eliminado exitosamente`, 'error',{
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


  // Calcular el índice de inicio y fin de la página actual
  const indexOfLastRamo = (currentPage + 1) * ramosPerPage;
  const indexOfFirstRamo = indexOfLastRamo - ramosPerPage;
  const currentRamos = filteredRamos.slice(indexOfFirstRamo, indexOfLastRamo);

  return (
    <div className="admin-container">
      <Navbar />
      <p className="text-center" style={{ fontSize: '25px', padding: '10px' }}>
        Bienvenido, Admin. Administre los datos.
      </p>

      <div className="container" style={{ marginBottom: '80px' }}>
        <h1>Ramos</h1>
        <Link to="/admin/crear_ramo" className="btn btn-success">
          Crear
        </Link>
        <div className="container" style={{ marginBottom: '80px' }}>
  <div className="mb-3">
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

        <table className="table table-striped">
          <thead className="table-primary">
            <tr>
              <th>ID Ramo</th>
              <th>ID Carrera</th>
              <th>ID Periodo</th>
              <th>Nombre</th>
              <th>Ayudantia</th>
              <th>Horas</th>
              <th>Gestionar</th>
            </tr>
          </thead>
          <tbody>
          {currentRamos.map((ramo) => (
              <tr key={ramo.id_ramo}>
                <td>{ramo.id_ramo}</td>
                <td>[{ramo.id_carrera}] {carrerasInfo[ramo.id_carrera]?.nombreC}</td>
                <td>[{ramo.id_periodo}] {periodosInfo[ramo.id_periodo]?.añoP}/{periodosInfo[ramo.id_periodo]?.semP}</td>
                <td>{ramo.nombre_ramo}</td>
                <td>{ramo.ayudantia_ramo}</td>                
                <td>{ramo.horas_ayudantia_ramo}</td>
                <td>
                  <Link to={`/admin/editar_ramo/${ramo.id_ramo}`} className="btn btn-primary btn-sm me-2">
                    Editar
                  </Link>
                  <button onClick={() => deleteRamo(ramo.id_ramo)} className="btn btn-danger btn-sm">
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
          pageCount={Math.ceil(filteredRamos.length / ramosPerPage)} // Usar la longitud de los datos filtrados
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
};

export default Estd;
