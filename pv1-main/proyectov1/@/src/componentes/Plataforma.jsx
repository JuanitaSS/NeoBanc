import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import estilos from '../estilos/Plataforma.module.css';

function Plataforma() {
  const saldoDisponible = 0.00; 

  return (
    <div>
      <Menu />

      <h1 className={estilos.tituloUsuario}>Hola querido usuario</h1>

      <div className={estilos.cuentasContenedor}>
        <div className={estilos.tituloCuentas}>Número de cuenta </div>
      

        <div className={estilos.contenedorMorado}>
          <div className={estilos.informacionCuenta}>
            <div className={estilos.NumCuenta}> 101922836</div>
            <div className={estilos.estado}>Activa</div>
          </div>

          <div className={estilos.saldoSubcontenedor}>
            <div>
              <h1 className={estilos.saldoDisponible}>Saldo Disponible</h1>
              <h2 className={estilos.saldoMonto}>${saldoDisponible.toFixed(2)}</h2> 
            </div>
            <div className={estilos.imagenSaldo}>
              <img
                src="/img/Plataforma.png" 
                alt="Imagen relacionada con el saldo"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={estilos.botonera}>
        <Link to="/Saldos" className={estilos.botonAccion}>
          <i className="material-icons">date_range</i> 
          Saldos y Movimientos
        </Link>
        
        <Link to="/Transferencias" className={estilos.botonAccion}>
          <i className="material-icons">near_me</i> 
          Transferencias
        </Link>
        
      </div>
    </div>
  );
}

export default Plataforma;
