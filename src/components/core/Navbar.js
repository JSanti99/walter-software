import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext";

import logo from "../../utils/img/logo.jpg";
import { GrAdd } from "react-icons/gr";
const Navbar = () => {
  const [muestrate, setMuestrate] = useState(false);
  const { userData, handleLogout } = useUser();
  return (
    <>
      <img src={logo} alt="" title="" className="logo" />
      <span
        className="icon-menu"
        id="btn-menu"
        onClick={() => setMuestrate(!muestrate)}
      ></span>
      <nav className={`nav ${muestrate ? "muestrate" : null}`} id="nav">
        <ul className="menu">
          <Link className="menu__item menu__link" to="/hoteles">
            Hoteles
          </Link>
          <Link className="menu__item menu__link" to="/restaurantes">
            Restaurantes
          </Link>
          <Link className="menu__item menu__link" to="/turisticos">
            Sitios Turisticos
          </Link>
          <Link className="menu__item menu__link" to="/entretenimiento">
            Entretenimiento
          </Link>
          <Link className="menu__item menu__link" to="/negocios">
            Negocios Tradicionales
          </Link>
          {!userData ? (
            <Link className="menu__item menu__link" to="/login">
              Login
            </Link>
          ) : (
            <>
              <Link className="menu__item menu__link" to="/establecimientos">
                <GrAdd /> Establecimiento
              </Link>
              {userData && (
                <Link to="#" className="menu__link">
                  {userData.user.username}
                </Link>
              )}
              <Link
                to="#"
                className="menu__item menu__link"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
