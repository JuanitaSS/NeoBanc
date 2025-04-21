import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import estilos from '../estilos/Transferencias.module.css';
import { useNavigate } from 'react-router-dom';

function Transferencias() {
  const [numeroCuentaDestino, setNumeroCuentaDestino] = useState('');
  const [valorTransferir, setValorTransferir] = useState('');
  const [bancoSeleccionado, setBancoSeleccionado] = useState('');
  const [bancos, setBancos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Simulamos una petición a la base de datos para obtener los bancos
    const bancosDesdeDB = [
      { BancoID: 1, Nombre: 'Banco Nacional', CodigoBanco: 'BN001' },
      { BancoID: 2, Nombre: 'Banco Popular', CodigoBanco: 'BP002' },
      { BancoID: 3, Nombre: 'Banco Ágil', CodigoBanco: 'BA003' },
    ];
    setBancos(bancosDesdeDB);
  }, []);

  const manejarEnvio = (e) => {
    e.preventDefault();
    const transferencia = {
      numeroCuentaDestino,
      monto: parseFloat(valorTransferir),
      bancoDestinoID: parseInt(bancoSeleccionado),
      esInterna: false, // Siempre externo
    };

    console.log('Datos enviados:', transferencia);

    // Simular envío a backend
    alert('Transferencia a banco nacional registrada con éxito');
    navigate('/plataforma');
  };

  return (
    <div>
      <Menu />
      <div className={estilos.contenedorTransferencia}>
        <h2 className={estilos.titulo}>Transferencia a Banco Nacional</h2>

        <form className={estilos.formulario} onSubmit={manejarEnvio}>
          <div className={estilos.grupoInput}>
            <label htmlFor="banco">Banco de Destino</label>
            <select
              id="banco"
              value={bancoSeleccionado}
              onChange={(e) => setBancoSeleccionado(e.target.value)}
              required
            >
              <option value="">Seleccione un banco</option>
              {bancos.map((banco) => (
                <option key={banco.BancoID} value={banco.BancoID}>
                  {banco.Nombre}
                </option>
              ))}
            </select>
          </div>

          <div className={estilos.grupoInput}>
            <label htmlFor="numeroCuenta">Número de Cuenta Destino</label>
            <input
              type="text"
              id="numeroCuenta"
              value={numeroCuentaDestino}
              onChange={(e) => setNumeroCuentaDestino(e.target.value)}
              required
            />
          </div>

          <div className={estilos.grupoInput}>
            <label htmlFor="valor">Valor a Transferir</label>
            <input
              type="number"
              id="valor"
              value={valorTransferir}
              onChange={(e) => setValorTransferir(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={estilos.botonTransferir}>
            Enviar Dinero
          </button>
        </form>
      </div>
    </div>
  );
}

export default Transferencias;
