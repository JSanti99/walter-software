import axios from "axios";
import { useEffect, useState, createContext, useMemo, useContext } from "react";
import { useHistory } from "react-router";
import { endpoint } from "../../utils/endpoint";
import { useUser } from "./UserContext";
const EstablecimientoContext = createContext();

export const EstablecimientoProvider = (props) => {
  const { userData } = useUser();
  const [establecimientos, setEstablecimientos] = useState(null);
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
        .then((res) =>
          setEstablecimientos(establecimientos.filter((est) => est.id !== id))
        );
    }
  };

  const value = useMemo(
    () => ({
      establecimientos,
      setEstablecimientos,
      tipo,
      setTipo,
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
