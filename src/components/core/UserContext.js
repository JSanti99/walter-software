import axios from "axios";
import { useEffect, useState, createContext, useMemo, useContext } from "react";
import { useHistory } from "react-router";
const UserContext = createContext();

export const UserProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) setUserData(JSON.parse(data));
  }, []);

  const handleLogin = ({ identifier, password }) => {
    axios
      .post("http://localhost:1337/auth/local", { identifier, password })
      .then((response) => {
        localStorage.setItem("usuario", JSON.stringify(response.data));
        setUserData(response.data);
        history.push("/");
      });
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
