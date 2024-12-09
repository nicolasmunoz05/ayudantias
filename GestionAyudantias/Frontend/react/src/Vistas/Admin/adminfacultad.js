import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Momentaneo/Axios';
import ReactPaginate from 'react-paginate';
import Navbar from '../../Componentes/Navbar';
import Foooter from '../../Componentes/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css';
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/facultad/';

const Estd = () => {
  const { showNotification } = useNotification();
  const [facultades, setFacultades] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Página actual
  const facultadesPerPage = 10; // Cantidad de facultades por página

  useEffect(() => {
    getFacultades();
  }, []);

  const getFacultades = async () => {
    const res = await axios.get(URI);
    setFacultades(res.data);
  };

  const deleteFacultad = async (id_facultad) => {
    const facultadToDelete = facultades.find(facultad => facultad.id_facultad === id_facultad);
    const confirmDelete = window.confirm(`¿Está seguro de que desea eliminar ${facultadToDelete.nombre_facultad}?`);
    
    if (confirmDelete) {
        await axios.delete(`${URI}${id_facultad}`);
        getFacultades();

        showNotification(`Facultad "${facultadToDelete.nombre_facultad}" eliminada exitosamente`,'error', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
        });
    }
};
  // Calcular el índice de inicio y fin de la página actual
  const indexOfLastFacultad = (currentPage + 1) * facultadesPerPage;
  const indexOfFirstFacultad = indexOfLastFacultad - facultadesPerPage;
  const currentFacultades = facultades.slice(indexOfFirstFacultad, indexOfLastFacultad);

  return (
    <div className="admin-container">
      <Navbar />
      <p className="text-center" style={{ fontSize: '25px', padding: '10px' }}>
        Bienvenido, Admin. Administre los datos.
      </p>

      <div className="container" style={{ marginBottom: '80px' }}>
        <h1>Facultades</h1>
        <Link to="/admin/crear_facultad" className="btn btn-success">
          Crear
        </Link>
        <table className="table table-striped">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentFacultades.map((facultad) => (
              <tr key={facultad.id_facultad}>
                <td>{facultad.id_facultad}</td>
                <td>{facultad.nombre_facultad}</td>
                <td>
                  <Link to={`/admin/editar_facultad/${facultad.id_facultad}`} className="btn btn-primary btn-sm me-2">
                    Editar
                  </Link>
                  <button onClick={() => deleteFacultad(facultad.id_facultad)} className="btn btn-danger btn-sm">
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
          pageCount={Math.ceil(facultades.length / facultadesPerPage)}
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

export default Estd;
