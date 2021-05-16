import axios from "axios";
import { useEffect, useState, createContext, useMemo, useContext } from "react";
import { useHistory } from "react-router";
import { useNotification } from "./NotificationContext";
const UserContext = createContext();

export const UserProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const { setError, setTexto, handleOpen } = useNotification();
  const history = useHistory();

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) setUserData(JSON.parse(data));
  }, []);

  const handleLogin = ({ identifier, password }) => {
    axios
      .post("http://localhost:1337/auth/local", { identifier, password })
      .then(
        (response) => {
          localStorage.setItem("usuario", JSON.stringify(response.data));
          setUserData(response.data);
          setTexto("Bienvenido!");
          setError(false);
          handleOpen();
          setTimeout(() => history.push("/"), 3000);
        },
        (error) => {
          setTexto("Algo ha pasado mal!");
          setError(true);
          handleOpen();
        }
      );
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUserData(null);
    history.push("/");
  };

  const value = useMemo(
    () => ({ userData, handleLogin, handleLogout }),
    [userData]
  );

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("coloque el hook dentro del provider");
  return context;
};
