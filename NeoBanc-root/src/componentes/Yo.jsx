import { useNavigate, useLocation } from 'react-router-dom';
import estilos from '../estilos/Yo.module.css'; 
import { format } from 'date-fns';

function Yo() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const cuenta = location.state?.cuenta
  const fechaNacimientoFormat = format(user?.fechaNacimiento,"yyyy-MM-dd")
  const usuario = {
    nombreCompleto: user?.nombreCompleto,
    Identificacion: user?.identificacion,
    fechaNacimiento: fechaNacimientoFormat,
    correoElectronico: user?.correoElectronico,
    telefono: user?.telefono,
    usuario : user?.userValidName
  };

  const manejarSalir = () => {

    navigate('/'); 
  };

  const manejarRegresar = () => {

    navigate('/plataforma', { state: { user:user, cuenta:cuenta } }); 
  };

  return (
    <div className={estilos.contenedorUsuario}>
      <h2 className={estilos.titulo}>Mi Usuario</h2>
      <div className={estilos.informacionUsuario}>
        <p><strong>Nombre Completo: </strong> {usuario.nombreCompleto}</p>
        <p><strong>Cedula: </strong> {usuario.identificacion}</p>
        <p><strong>Fecha de Nacimiento: </strong> {usuario.fechaNacimiento}</p>
        <p><strong>Correo Electronico: </strong> {usuario.correoElectronico}</p>
        <p><strong>Telefono: </strong> {usuario.telefono}</p>
        <p><strong>Usuario: </strong> {usuario.usuario}</p>
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
