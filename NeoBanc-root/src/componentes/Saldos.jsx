import React from 'react';
import Menu from './Menu';
import estilos from '../estilos/Saldos.module.css';

function Saldos() {
  const movimientosEjemplo = [
    {
      TransaccionID: 1001,
      FechaTransaccion: '2024-10-01T10:00:00Z',
      Tipo: 'Enviado',
      EsInterna: true,
      CuentaDestinoID: 2,
      NumeroCuentaDestino: '111122223333',
      BancoDestinoID: null,
      NombreBanco: null,
      EstadoTransaccion: 'Completado',
      Descripcion: 'Pago a cuenta interna',
      Monto: 500.0
    },
    {
      TransaccionID: 1002,
      FechaTransaccion: '2024-10-02T14:30:00Z',
      Tipo: 'Enviado',
      EsInterna: false,
      CuentaDestinoID: null,
      NumeroCuentaDestino: '1234567890',
      BancoDestinoID: 1,
      NombreBanco: 'Bancolombia',
      EstadoTransaccion: 'Pendiente',
      Descripcion: 'Transferencia a banco nacional',
      Monto: 750.0
    },
    {
      TransaccionID: 1003,
      FechaTransaccion: '2024-10-03T09:45:00Z',
      Tipo: 'Recibido',
      EsInterna: true,
      CuentaDestinoID: 1,
      NumeroCuentaDestino: '555566667777',
      BancoDestinoID: null,
      NombreBanco: null,
      EstadoTransaccion: 'Completado',
      Descripcion: 'Reembolso interno',
      Monto: 300.0
    },
    {
      TransaccionID: 1004,
      FechaTransaccion: '2024-10-04T11:20:00Z',
      Tipo: 'Recibido',
      EsInterna: false,
      CuentaDestinoID: null,
      NumeroCuentaDestino: '9876543210',
      BancoDestinoID: 2,
      NombreBanco: 'Davivienda',
      EstadoTransaccion: 'Completado',
      Descripcion: 'Pago recibido desde banco nacional',
      Monto: 900.0
    }
  ];

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
              <th>Tipo de Transacción</th>
              <th>Banco</th>
              <th>Número de Cuenta</th>
              <th>Estado</th>
              <th>Descripción</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {movimientosEjemplo.map((mov) => (
              <tr key={mov.TransaccionID}>
                <td>{mov.TransaccionID}</td>
                <td>{new Date(mov.FechaTransaccion).toLocaleDateString()}</td>
                <td>{mov.Tipo}</td>
                <td>{mov.EsInterna ? 'Interna' : 'Externa'}</td>
                <td>{mov.EsInterna ? '-' : mov.NombreBanco || `Banco ID ${mov.BancoDestinoID}`}</td>
                <td>{mov.NumeroCuentaDestino}</td>
                <td>{mov.EstadoTransaccion}</td>
                <td>{mov.Descripcion}</td>
                <td>${mov.Monto.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Saldos;
