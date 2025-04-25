import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Menu from './Menu';
import estilos from '../estilos/Plataforma.module.css';

function Plataforma() {
  const location = useLocation();
  const [user] = useState(location.state?.user || null);
  const [cuenta, setCuenta] = useState(location.state?.cuenta || null);
  useEffect(() => 
    {
      const fetchCuenta = async() => 
        {
          try 
          {
              const response = await fetch(`https://localhost:7220/api/CuentaBancaria/numerocuenta=${cuenta.numeroCuenta}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }})
                .then(async (res)=>
                {
                  if(!res.ok)
                  {
                    const errorData = await res.text()
                    alert(errorData)
                    throw new Error(errorData)
                  }
                  return res;
                })
                .catch((err) => console.error("Error al consultar la cuenta:", err))
              const data = await response.json();
              if (JSON.stringify(data) !== JSON.stringify(cuenta)) {
                  setCuenta(data);
              }
          } catch (error) {
              console.error("Error al obtener la cuenta actualizada:", error);
          }
      };
        const interval = setInterval(() => 
          {
            fetchCuenta();
          }, 3000); // 3 segundos
        return () => clearInterval(interval);
    }, [cuenta]);
  if (!user || !cuenta) {
    return <p>Error: No se encontró información del usuario.</p>; 
  }
  const saldoDisponible = Number(cuenta?.saldo);
  return (
    <div>
      <Menu />

      <h1 className={estilos.tituloUsuario}>Hola querido {user?.nombreCompleto}</h1>

      <div className={estilos.cuentasContenedor}>
        <div className={estilos.tituloCuentas}>Número de cuenta: {cuenta?.numeroCuenta}</div>
      

        <div className={estilos.contenedorMorado}>
          <div className={estilos.informacionCuenta}>
            <div className={estilos.estado}>Estado de la cuenta: {cuenta?.estadoCuenta}</div>
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
        <Link to="/Saldos" state ={{ user:user,cuenta:cuenta }} className={estilos.botonAccion}>
          <i className="material-icons">date_range</i> 
          Saldos y Movimientos
        </Link>
        
        <Link to="/Transferencias" state ={{ user:user,cuenta:cuenta }} className={estilos.botonAccion}>
          <i className="material-icons">near_me</i> 
          Transferencias
        </Link>
        
      </div>
    </div>
  );
}

export default Plataforma;
