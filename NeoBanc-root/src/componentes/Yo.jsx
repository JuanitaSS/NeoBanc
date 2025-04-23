import React from 'react';
import { useNavigate } from 'react-router-dom';
import estilos from '../estilos/Yo.module.css'; 

function Yo() {
  const navigate = useNavigate();


  const usuario = {
    nombre: 'Juanita Solórzano',
    email: 'juanita.ss@gmail.com',
    numeroCuenta: '123456789',
    tipoCuenta: 'Ahorros',
  };

  const manejarSalir = () => {

    navigate('/'); 
  };

  const manejarRegresar = () => {

    navigate('/plataforma'); 
  };

  return (
    <div className={estilos.contenedorUsuario}>
      <h2 className={estilos.titulo}>Mi Usuario</h2>
      <div className={estilos.informacionUsuario}>
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Número de Cuenta:</strong> {usuario.numeroCuenta}</p>
        <p><strong>Tipo de Cuenta:</strong> {usuario.tipoCuenta}</p>
      </div>
      <div className={estilos.botonera}>
        <button className={estilos.boton} onClick={manejarRegresar}>
          Regresar a la Plataforma
        </button>
        <button className={estilos.boton} onClick={manejarSalir}>
          Salir
        </button>
      </div>
    </div>
  );
}

export default Yo;
