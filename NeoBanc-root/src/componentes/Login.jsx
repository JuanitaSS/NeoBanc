import { useState } from 'react';
import estilos from '../estilos/Login.module.css'; 
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const [usuario, setUsuario] = useState(''); 
  const [contrasena, setContrasena] = useState(''); 
  const navigate = useNavigate(); 

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    fetch(`https://localhost:7220/api/Usuario/Login/user=${usuario}-password${contrasena}`, {
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
        return res.json();
      })
      .then((usuario)=>
      {
        fetch(`https://localhost:7220/api/CuentaBancaria/numerocuenta=${usuario.telefono}`, {
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
            return res.json();
          })
          .then((cuenta)=>{
            navigate('/Plataforma',{state: { user: usuario, cuenta:cuenta } })
          })
          .catch((err) => console.error("Error al consultar la cuenta:", err))
      })
      .catch((err) => console.error("Error al autenticar usuario:", err));
  };

  return (
    <div className={estilos.contenedorLogin}>
      <h1 className={estilos.titulo}>NeoBanck</h1>
      <div className={estilos.cajaLogin}>
        <form onSubmit={manejarEnvio}>
          <div className={estilos.grupoInput}>
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className={estilos.grupoInput}>
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={estilos.botonLogin}>
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
