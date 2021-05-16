import { useEffect, useState } from "react";
import styled from "styled-components";

import EstablecimientoCard from "./EstablecimientoCard";
import { useEstablecimientos } from "./core/EstablecimientoContext";
import { useNotification } from "./core/NotificationContext";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 1% 3%;
`;

const Establecimientos = ({ tipo }) => {
  const { establecimientos, setTipo } = useEstablecimientos();
  const { open, handleRender } = useNotification();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setNotification(handleRender());
  }, [open]);

  useEffect(() => setTipo(tipo));
  return (
    <>
      {notification}
      <Container>
        {establecimientos &&
          establecimientos.length > 0 &&
          establecimientos.map((establecimiento) => (
            <EstablecimientoCard
              key={establecimiento.id}
              establecimiento={establecimiento}
            />
          ))}
      </Container>
    </>
  );
};

export default Establecimientos;
