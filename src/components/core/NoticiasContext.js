import axios from "axios";
import { useEffect, useState, createContext, useMemo, useContext } from "react";
import { useHistory } from "react-router";
import { endpoint } from "../../utils/endpoint";
import { useNotification } from "./NotificationContext";
import { useUser } from "./UserContext";
const NoticiasContext = createContext();

export const NoticiasProvider = (props) => {
  const [noticias, setNoticias] = useState(null);
  const { userData } = useUser();
  const { setError, setTexto, handleOpen } = useNotification();
  const history = useHistory();

  useEffect(() => {
    axios.get(`${endpoint}/noticias`).then((res) => setNoticias(res.data));
  }, []);

  const handlePost = (data) => {
    if (userData) {
      axios
        .post(`${endpoint}/noticias`, data, {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        })
        .then((res) => {
          setNoticias([...noticias, res.data]);
          setTexto("Noticia creada!");
          setError(false);
          handleOpen();
        });
    }
  };
  const handlePut = ({ id, data, setIsOpen }) => {
    if (userData) {
      axios
        .put(`${endpoint}/noticias/${id}`, data, {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        })
        .then((res) => {
          setNoticias([...noticias.filter((noti) => noti.id !== id), res.data]);
          setIsOpen(false);
          setTexto("Noticia actualizada!");
          setError(false);
          handleOpen();
        });
    }
  };

  const handleDelete = (id) => {
    if (userData) {
      axios
        .delete(`${endpoint}/noticias/${id}`, {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        })
        .then((res) => {
          setNoticias(noticias.filter((est) => est.id !== id));
          setTexto("Noticia eliminada!");
          setError(false);
          handleOpen();
        });
    }
  };

  const value = useMemo(
    () => ({
      noticias,
      setNoticias,
      handlePost,
      handlePut,
      handleDelete,
    }),
    [noticias]
  );

  return <NoticiasContext.Provider value={value} {...props} />;
};
export const useNoticias = () => {
  const context = useContext(NoticiasContext);
  if (!context) throw new Error("coloque el hook dentro del provider");
  return context;
};
