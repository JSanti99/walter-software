import axios from "axios";
import { useEffect, useState, createContext, useMemo, useContext } from "react";
import { useHistory } from "react-router";
import { endpoint } from "../../utils/endpoint";
import { useNotification } from "./NotificationContext";
import { useUser } from "./UserContext";
const EstablecimientoContext = createContext();

export const EstablecimientoProvider = (props) => {
  const { userData } = useUser();
  const [establecimientos, setEstablecimientos] = useState(null);
  const { setError, setTexto, handleOpen } = useNotification();
  const [tipo, setTipo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (tipo) {
      axios
        .get(
          `${endpoint}/establecimientos?_where[0][tipoEstablecimiento]=${tipo}`
        )
        .then((res) => setEstablecimientos(res.data));
    }
  }, [tipo]);

  const handleDelete = (id) => {
    if (userData) {
      axios
        .delete(`${endpoint}/establecimientos/${id}`, {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        })
        .then(
          (res) => {
            setEstablecimientos(
              establecimientos.filter((est) => est.id !== id)
            );
            setTexto("Establecimiento eliminado!");
            setError(false);
            handleOpen();
          },
          (error) => {
            setTexto("Algo ha pasado mal!");
            setError(true);
            handleOpen();
          }
        );
    }
  };

  const handlePost = (formFoto, data) => {
    if (userData) {
      axios
        .post("http://localhost:1337/upload", formFoto, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userData.jwt}`,
          },
        })
        .then((foto) => {
          axios
            .post(
              "http://localhost:1337/establecimientos",
              {
                ...data,
                fotos: foto.data,
              },
              { headers: { Authorization: `Bearer ${userData.jwt}` } }
            )
            .then((establecimiento) => {
              setTexto("Establecimiento creado!");
              setError(true);
              handleOpen();
            });
        });
    }
  };

  const handlePut = (formFoto, establecimientoData, data, setIsOpen) => {
    axios
      .post("http://localhost:1337/upload", formFoto, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.jwt}`,
        },
      })
      .then((foto) => {
        axios
          .put(
            `http://localhost:1337/establecimientos/${establecimientoData.id}`,
            {
              ...data,
              fotos: foto.data,
            },
            { headers: { Authorization: `Bearer ${userData.jwt}` } }
          )
          .then((establecimiento) => {
            setEstablecimientos([
              ...establecimientos.filter(
                (est) => est.id !== establecimiento.data.id
              ),
              establecimiento.data,
            ]);
            setTexto("Establecimiento actualizado!");
            setError(false);
            handleOpen();
            setIsOpen(false);
          });
      });
  };

  const value = useMemo(
    () => ({
      establecimientos,
      setEstablecimientos,
      tipo,
      setTipo,
      handlePost,
      handlePut,
      handleDelete,
    }),
    [establecimientos, tipo, setTipo]
  );

  return <EstablecimientoContext.Provider value={value} {...props} />;
};
export const useEstablecimientos = () => {
  const context = useContext(EstablecimientoContext);
  if (!context) throw new Error("coloque el hook dentro del provider");
  return context;
};
