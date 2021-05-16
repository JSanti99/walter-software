import { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import Modal from "react-modal";

import { materialShadow } from "./shadows";
import { useNoticias } from "./core/NoticiasContext";
import { useUser } from "./core/UserContext";

import { AiFillDelete } from "react-icons/ai";
import { GrEdit, GrClock } from "react-icons/gr";
import NoticiasForm from "./NoticiasForm";

const NoticiaCard = ({ noticia }) => {
  const { userData } = useUser();
  const { noticias, handleDelete } = useNoticias();
  const [modalIsOpen, setIsOpen] = useState(false);
  Modal.setAppElement("#root");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "20%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const CustomModal = () => (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <NoticiasForm noticiaData={noticia} setIsOpen={setIsOpen} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
      </div>
    </Modal>
  );

  return (
    <>
      <StyledCard>
        {userData && (
          <Delete>
            <GrEdit onClick={() => setIsOpen(true)} size={28} />
            <AiFillDelete onClick={() => handleDelete(noticia.id)} size={28} />
          </Delete>
        )}
        <header>
          <h1>{noticia.title}</h1>
        </header>
        <section>
          <p>{noticia.descripcion}</p>
        </section>
        <footer>
          <div id="info">
            <p>
              <GrClock size={20} />
              <small> {dayjs(noticia.updated_at).format("YYYY-MM-DD")}</small>
            </p>
          </div>
        </footer>
      </StyledCard>
      <CustomModal />
    </>
  );
};

const StyledCard = styled.article`
  background: #fff;
  margin: 1em;
  padding: 1rem;
  display: flex;
  flex-flow: column;
  border-radius: 0.5rem;
  transition: 300ms ease;
  ${materialShadow.base}

  h1 {
    margin-bottom: 1rem;
  }
  img {
    width: 100%;
    border-radius: 0.2em;
  }

  > section:after {
    content: " ";
    display: block;
    height: 1px;
    width: 100%;
    background-color: #ccc;
  }

  p {
    max-width: 80%;
    line-height: 1.45em;
    color: #666;
  }

  footer {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: auto;
    p {
      display: inline;
      color: #e63946;
    }

    #info {
      display: grid;
      grid-template-columns: 125px;
    }

    a {
      text-decoration: none;
      color: #457b9d;

      :last-child {
        padding-right: 0;
      }
    }
  }

  &:hover {
    ${materialShadow.hover}
    img {
      filter: grayscale(0) blur(0);
    }
  }
`;

const Delete = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 5px;
  color: #e63946;
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop*/
  background: #e63946;
  color: #fff;
  font-size: 18px;
  padding: 0.25em 1em;
  border: 2px solid #333;
  border-radius: 3px;
`;

export default NoticiaCard;
