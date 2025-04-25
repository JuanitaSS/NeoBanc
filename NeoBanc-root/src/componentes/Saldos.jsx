import { useEffect, useState } from 'react';
import Menu from './Menu';
import {  useLocation } from 'react-router-dom';
import estilos from '../estilos/Saldos.module.css';
import { format } from 'date-fns';

function Saldos() {
  const location = useLocation();
  const [cuenta] = useState(location.state?.cuenta || null);
  const[transfer,setTransfer] = useState([])
  useEffect(() => {
    fetch(`https://localhost:7220/api/transaccion/cuentaorigenid=${cuenta?.cuentaId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
    })
      .then((data) => data.json())
      .then((info) => {
        setTransfer(info);
      })
      .catch((err) => console.error("Error al consultar transferencias:", err));
  }, [cuenta]);

  function interna_externa (bool){
    if(bool)
    {
      return 'Interna'
    }
    return 'Externa'
  }

  function banco(bool,BancoDestinoID){
    if(bool)
    {
      return 'NeoBanc'
    }
    const banco =fetch(`https://localhost:7220/api/bancoexterno/${BancoDestinoID}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
    })
      .then((data) => data.json())
      .catch((err) => console.error("Error al consultar transferencias:", err));
    return banco.nombre
  }
  var trans = transfer;
  return (
    <div>
      <Menu />
      <h1 className={estilos.titulo}>Saldos y Movimientos</h1>
      <div className={estilos.tablaContenedor}>
        <table className={estilos.tabla}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Movimiento</th> 
              <th>Banco</th>
              <th>Número de Cuenta</th>
              <th>Estado</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {trans.map((mov) => (
              <tr key={mov.transaccionId}>
                <td>{mov.transaccionId}</td>
                <td>{format(mov.fechaTransaccion,"yyyy-MM-dd")}</td>
                <td>{interna_externa(mov.esInterna)}</td>
                <td>{banco(mov.esInterna,mov.bancoDestinoId)}</td>
                <td>{mov.numeroCuentaDestino}</td>
                <td>{mov.estadoTransaccion}</td>
                <td>${mov.monto.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Saldos;
