import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Momentaneo/Axios';
import ReactPaginate from 'react-paginate';
import Navbar from '../../Componentes/Navbar';
import Foooter from '../../Componentes/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNotification } from './NotificationContext';

const URI = 'http://localhost:8000/admin/admin/';

function Estd() {
  const { showNotification } = useNotification();
  const [administradores, setAdministradores] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const administradoresPerPage = 10;

  useEffect(() => {
    getAdministradores();
  }, []);

  const getAdministradores = async () => {
    const res = await axios.get(URI);
    setAdministradores(res.data);
  };

  const deleteAdministrador = async (rut_administrador) => {
    const adminToDelete = administradores.find(admin => admin.rut_administrador === rut_administrador);
    const confirmDelete = window.confirm(`¿Está seguro de que desea eliminar el Rut ${rut_administrador}?`);

    if (confirmDelete) {
      await axios.delete(`${URI}${rut_administrador}`);
      getAdministradores();        
      showNotification(`Admin "${adminToDelete.rut_administrador}" eliminado exitosamente`, 'error',{
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
    });
}
};

  const indexOfLastAdministrador = (currentPage + 1) * administradoresPerPage;
  const indexOfFirstAdministrador = indexOfLastAdministrador - administradoresPerPage;
  const currentAdministradores = administradores.slice(indexOfFirstAdministrador, indexOfLastAdministrador);

  return (
    <div className='admin-container'>
      <div className="tabla-estudiantes">
        <Navbar />
        <p className="text-center" style={{ fontSize: '25px'}}>
          Bienvenido, Admin. Administre los datos.
        </p>

        <div className="container">
          <h1>Administradores</h1>
          <Link to={`/admin/crear_administrador`} className='btn btn-success'>
            Crear
          </Link>
          <table className='table table-striped'>
            <thead className='table-primary'>
              <tr>
                <th>Rut</th>
                <th>ID Rol</th>
                <th>Correo</th>
                <th>Contraseña</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentAdministradores.map((administrador) => (
                <tr key={administrador.rut_administrador}>
                  <td>{administrador.rut_administrador}</td>
                  <td>{administrador.id_rol}</td>
                  <td>{administrador.correo_administrador}</td>
                  <td>{administrador.contraseña_administrador}</td>
                  <td>
                    <Link
                      to={`/admin/editar_administrador/${administrador.rut_administrador}`}
                      className='btn btn-primary btn-sm me-2'
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteAdministrador(administrador.rut_administrador)}
                      className='btn btn-danger btn-sm'
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
            pageCount={Math.ceil(administradores.length / administradoresPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
      <div style={{ marginBottom: '80px' }}></div>

      <Foooter />

    </div>
    
  );
}

export default Estd;
