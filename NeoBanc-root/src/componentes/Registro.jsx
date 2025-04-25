import { useState } from 'react';
import estilos from '../estilos/Resgistro.module.css';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [cc, setCc] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [celular, setCelular] = useState('');
  

  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();
    const fechaNacimientoFormat = format(fechaNacimiento,"yyyy-MM-dd'T'HH:mm:ss")
    const data ={
      usuarioId:0,
      nombreCompleto: nombre,
      identificacion: cc,
      fechaNacimiento: fechaNacimientoFormat,
      correoElectronico: correo,
      telefono:celular, 
      fechaRegistro: fechaNacimientoFormat,
      userValidName:usuario,
      passwordHash:contrasena
    }
    fetch('https://localhost:7220/api/Usuario',{
      method: 'POST',
      headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    })
      .then(async (res)=>{
        if(!res.ok)
        {
          const errorData = await res.text()
          alert(errorData)
          throw new Error(errorData)
        }
        return res.json()
      })
      .then(()=>{
        fetch(`https://localhost:7220/api/Usuario/identificacion=${cc}`, {
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
          .then((usuario)=>{
            const dataCuenta ={
              cuentaId:0,
              usuarioId: usuario.usuarioId,
              numeroCuenta: usuario.telefono,
              saldo:0,
              estadoCuenta:'Activa',
              fechaCreacion:usuario.fechaRegistro
            }
            fetch('https://localhost:7220/api/CuentaBancaria',{
              method: 'POST',
              headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
              body: JSON.stringify(dataCuenta)
            })
            .then(async (res)=>{
              if(!res.ok)
              {
                const errorData = await res.text()
                alert(errorData)
                throw new Error(errorData)
              }
              return res.json();
            })
            .then(()=>{
              navigate('/login')
            })
            .catch((err) => console.error("Error al registrar la cuenta:", err))
          })
      })
      .catch((err) => console.error("Error al registrar el usuario:", err))
  };

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.formulario}>
        <h2>Registro</h2>
        <form onSubmit={manejarEnvio}>

          <div className={estilos.grupoInput}>
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className={estilos.grupoInput}>
            <label htmlFor="cc">Cédula de ciudadanía</label>
            <input
              type="text"
              id="cc"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              required
            />
          </div>

          <div className={estilos.grupoInput}>
            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
            />
          </div>

          <div className={estilos.grupoInput}>
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

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

          <div className={estilos.grupoInput}>
            <label htmlFor="celular">Número de Celular</label>
            <input
              type="tel"
              id="celular"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={estilos.botonRegistro}>
            Registrarse
          </button>
        </form>
      </div>

      <div className={estilos.imagen}>
        <img src="/img/Registro.png" alt="Imagen del banco" />
      </div>
    </div>
  );
}

export default Registro;
