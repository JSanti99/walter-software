import { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import { useUser } from "./core/UserContext";
import EstablecimientoForm from "./EstablecimientoForm";

import defaultImg from "../utils/img/banner.jpg";
import { endpoint } from "../utils/endpoint";
import { materialShadow } from "./shadows";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { useEstablecimientos } from "./core/EstablecimientoContext";

const EstablecimientoCard = ({ establecimiento }) => {
  const { userData } = useUser();
  const { handleDelete } = useEstablecimientos();
  const [modalIsOpen, setIsOpen] = useState(false);
  Modal.setAppElement("#root");

  const calificacion = {
    uno: "⭐",
    dos: "⭐⭐",
    tres: "⭐⭐⭐",
    cuatro: "⭐⭐⭐⭐",
    cinco: "⭐⭐⭐⭐⭐",
  };

  const CustomModal = () => (
    <Modal isOpen={modalIsOpen} contentLabel="Example Modal">
      <EstablecimientoForm
        establecimientoData={establecimiento}
        setIsOpen={setIsOpen}
      />
      <div>
        <button>Guardar</button>
        <button onClick={() => setIsOpen(false)}>Cancelar</button>
      </div>
    </Modal>
  );

  return (
    <>
      <StyledCard>
        {userData && (
          <Delete>
            <GrEdit onClick={() => setIsOpen(true)} size={28} />
            <AiFillDelete
              onClick={() => handleDelete(establecimiento.id)}
              size={28}
            />
          </Delete>
        )}
        <img
          alt=""
          src={
            establecimiento.fotos.length > 0
              ? `${endpoint}${establecimiento.fotos[0].url}`
              : defaultImg
          }
        />
        <header>
          <h1>{establecimiento.nombre}</h1>
        </header>
        <section>
          <p>{establecimiento.descripcion}</p>
        </section>
        <footer>
          <div id="info">
            <p>
              <FaMapMarkerAlt size={20} />
              <small>{establecimiento.ubicacion}</small>
            </p>
            <a href={establecimiento.infoContacto}>
              <TiContacts size={25} />
            </a>
          </div>
          <div>{calificacion[establecimiento.calificacion]}</div>
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
    margin-bottom: 0;
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

export default EstablecimientoCard;
