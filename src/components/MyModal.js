import { createPortal } from "react-dom";
import styled from "styled-components";
const MyModal = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) return null;
  return createPortal(
    <Overlay>
      <Container>
        {children}
        <Footer>
          <Button onClick={() => setIsOpen(false)}>Cerrar</Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById("modal")
  );
};

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  min-height: auto;
  min-width: auto;
  background: #ccc;
  border: 1px solid #fff;
  border-radius: 1%;
  overflow: auto;
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop*/
  background: #e63946;
  color: #fff;
  font-size: 18px;
  padding: 0.25em 1em;
  border: 2px solid #333;
  border-radius: 3px;
  margin-left: auto;
  grid-column: -1;
`;

const Footer = styled.footer`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin-top: 10px;
`;

export default MyModal;
