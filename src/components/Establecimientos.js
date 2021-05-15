import { useEffect } from "react";

import EstablecimientoCard from "./EstablecimientoCard";

import styled from "styled-components";
import { useEstablecimientos } from "./core/EstablecimientoContext";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 1% 3%;
`;

const Establecimientos = ({ tipo }) => {
  const { establecimientos, setTipo } = useEstablecimientos();
  useEffect(() => setTipo(tipo));
  return (
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
  );
};

export default Establecimientos;
