import React from "react";
import styled from "styled-components";

import { useNoticias } from "./core/NoticiasContext";
import NoticiaCard from "./NoticiaCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 1% 3%;
`;

const Noticias = () => {
  const { noticias } = useNoticias();
  return (
    <Container>
      {noticias &&
        noticias.map((noticia) => (
          <NoticiaCard key={noticia.id} noticia={noticia} />
        ))}
    </Container>
  );
};

export default Noticias;
