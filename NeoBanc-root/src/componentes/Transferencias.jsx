import { useState, useEffect } from 'react';
import Menu from './Menu';
import estilos from '../estilos/Transferencias.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Decimal from 'decimal.js'
import { format } from 'date-fns';

function Transferencias() {
  const location = useLocation();
  const [user] = useState(location.state?.user || null);
  const [cuenta] = useState(location.state?.cuenta || null);
  const [numeroCuentaDestino,setNumeroCuentaDestino] = useState('')
  const [valorTransferir,setValorTransferir] = useState('')
  const [bancoSeleccionado, setBancoSeleccionado] = useState('');
  const [bancos, setBancos] = useState([]);
  const fechaCreacionFormat = format("2025-05-24","yyyy-MM-dd'T'HH:mm:ss")
  const navigate = useNavigate();

  useEffect(() => {
    const cargarBancos = async () => {
      try {
        const response = await fetch('https://localhost:7220/api/bancoexterno', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!response.ok) {
          throw new Error(await response.text());
        }
  
        const data = await response.json();
        setBancos(data);
      } catch (err) {
        console.error("Error al consultar los bancos:", err);
      }
    };
  
    cargarBancos();
  }, []);
  const manejarEnvio = (e) => {
    e.preventDefault();
    const transferenciaSalida = {
      transaccionId:0,
      cuentaOrigenId:cuenta?.cuentaId,
      cuentaDestinoId:null,
      numeroCuentaDestino: numeroCuentaDestino,
      monto: new Decimal(valorTransferir),
      bancoDestinoId: parseInt(bancoSeleccionado),
      esInterna: false,
      estadoTransaccion:'Pendiente',
      fechaTransaccion:fechaCreacionFormat
    };
    fetch('https://localhost:7220/api/transaccion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(transferenciaSalida),
    })
      .then(async(response) => {
        if(!response.ok)
          {
            const errorData = await response.text()
            alert(errorData)
            throw new Error(errorData)
          }
        return response.json();
      })
      .then(() => {
        alert('Transferencia exitosa');
        navigate('/plataforma', { state: { user:user, cuenta: cuenta } });
      })
      .catch((error) => {
        alert('Error al realizar la transferencia',error);
      });
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
                <option key={banco.bancoId} value={banco.bancoId}>
                  {banco.nombre}
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
