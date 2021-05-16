import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useNoticias } from "./core/NoticiasContext";
import { useNotification } from "./core/NotificationContext";
import NoticiaCard from "./NoticiaCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 1% 3%;
`;

const Noticias = () => {
  const { noticias } = useNoticias();
  const { open, handleRender } = useNotification();
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    setNotification(handleRender());
  }, [open]);

  return (
    <>
      {notification}
      <Container>
        {noticias &&
          noticias.map((noticia) => (
            <NoticiaCard key={noticia.id} noticia={noticia} />
          ))}
      </Container>
    </>
  );
};

export default Noticias;
