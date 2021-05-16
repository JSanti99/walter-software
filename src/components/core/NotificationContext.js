import { useState, createContext, useMemo, useContext } from "react";
import Notification from "../Notificacion";
const NotificationContext = createContext();

export const NotificationProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [texto, setTexto] = useState(null);
  const [error, setError] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => setOpen(false), 3000);
  };

  const handleRender = () => {
    if (!open) return null;
    return <Notification texto={texto} error={error} />;
  };

  const value = useMemo(
    () => ({ open, handleOpen, handleRender, setTexto, setError }),
    [open, texto, error]
  );

  return <NotificationContext.Provider value={value} {...props} />;
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("coloque el hook dentro del provider");
  return context;
};
