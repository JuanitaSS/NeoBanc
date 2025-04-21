import { Link } from 'react-router-dom';
import estilos from '../estilos/Menu.module.css'; 

function Menu() {
  return (
    <div className={estilos.menu}>
      <h2 className={estilos.logo}>NeoBanc</h2>
      <nav className={estilos.nav}>
        <Link to="/Plataforma" className={estilos.menuItem}>
          <i className="material-icons">home</i> 
        </Link>
        <Link to="/Saldos" className={estilos.menuItem}>
          <i className="material-icons">date_range</i> 
        </Link>
        <Link to="/Transferencias" className={estilos.menuItem}>
          <i className="material-icons">near_me	
          </i> 
        </Link>
        <Link to="/Yo" className={estilos.menuItem}>
          <i className="material-icons">account_circle</i> 
        </Link>
      </nav>
    </div>
  );
}

export default Menu;
