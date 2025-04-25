import { Link, useLocation } from 'react-router-dom';
import estilos from '../estilos/Menu.module.css'; 

function Menu() {
  const location = useLocation()
  const user = location.state?.user
  const cuenta = location.state?.cuenta
  return (
    <div className={estilos.menu}>
      <h2 className={estilos.logo}>NeoBanc</h2>
      <nav className={estilos.nav}>
        <Link to="/Plataforma" state={{ user:user,cuenta:cuenta  }} className={estilos.menuItem}>
          <i className="material-icons">home</i> 
        </Link>
        <Link to="/Saldos" state={{ user:user,cuenta:cuenta  }} className={estilos.menuItem}>
          <i className="material-icons">date_range</i> 
        </Link>
        <Link to="/Transferencias" state={{ user:user,cuenta:cuenta  }} className={estilos.menuItem}>
          <i className="material-icons">near_me	
          </i> 
        </Link>
        <Link to="/Yo" state={{ user:user,cuenta:cuenta  }} className={estilos.menuItem}>
          <i className="material-icons">account_circle</i> 
        </Link>
      </nav>
    </div>
  );
}

export default Menu;
