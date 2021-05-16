import { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useUser } from "./UserContext";

import logo from "../../utils/img/logo.jpg";
import { GrAdd } from "react-icons/gr";
import styled from "styled-components";

const Navbar = () => {
  const [muestrate, setMuestrate] = useState(false);
  const { userData, handleLogout } = useUser();
  const location = useLocation();
  const history = useHistory();
  return (
    <>
      <Img
        src={logo}
        alt=""
        className="logo"
        onClick={() => history.push("/")}
      />
      <span
        className="icon-menu"
        id="btn-menu"
        onClick={() => setMuestrate(!muestrate)}
      ></span>
      <nav className={`nav ${muestrate ? "muestrate" : null}`} id="nav">
        <ul className="menu">
          <Link
            className={`menu__item menu__link ${
              location.pathname === "/hoteles" && "selected"
            }`}
            to="/hoteles"
          >
            Hoteles
          </Link>
          <Link
            className={`menu__item menu__link ${
              location.pathname === "/restaurantes" && "selected"
            }`}
            to="/restaurantes"
          >
            Restaurantes
          </Link>
          <Link
            className={`menu__item menu__link ${
              location.pathname === "/turisticos" && "selected"
            }`}
            to="/turisticos"
          >
            Sitios Turisticos
          </Link>
          <Link
            className={`menu__item menu__link ${
              location.pathname === "/entretenimiento" && "selected"
            }`}
            to="/entretenimiento"
          >
            Entretenimiento
          </Link>
          <Link
            className={`menu__item menu__link ${
              location.pathname === "/negocios" && "selected"
            }`}
            to="/negocios"
          >
            Negocios Tradicionales
          </Link>
          <Link
            className={`menu__item menu__link ${
              location.pathname === "/noticias" && "selected"
            }`}
            to="/noticias"
          >
            Noticias
          </Link>
          {!userData ? (
            <Link
              className={`menu__item menu__link ${
                location.pathname === "/login" && "selected"
              }`}
              to="/login"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                className={`menu__item menu__link ${
                  location.pathname === "/add-noticias" && "selected"
                }`}
                to="/add-noticias"
              >
                <GrAdd /> Noticias
              </Link>
              <Link
                className={`menu__item menu__link ${
                  location.pathname === "/establecimientos" && "selected"
                }`}
                to="/establecimientos"
              >
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

const Img = styled.img`
  &:hover {
    border: 1px solid #96bb7c;
    padding: 5px 10px;
    cursor: pointer;
  }
`;
export default Navbar;
