import { useState } from 'react';
import estilos from '../estilos/Resgistro.module.css';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [cc, setCc] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [celular, setCelular] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState('ahorros');

  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();

    console.log({
      nombre,
      cc,
      fechaNacimiento,
      correo,
      usuario,
      contrasena,
      celular,
      tipoCuenta
    });

    navigate('/Plataforma');
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
