import { createPortal } from "react-dom";
import styled from "styled-components";
import { AiFillAlert } from "react-icons/ai";
const Notification = ({ error, texto }) => {
  return createPortal(
    <Overlay>
      <Container error={error}>
        <AiFillAlert size={28} style={{ color: "#fff" }} />
        <Footer>
          <p>{texto}</p>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById("notification")
  );
};

const Overlay = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
`;

const Container = styled.div`
  min-height: auto;
  max-width: 200px;
  background: ${(props) => (props.error ? "#e63946" : "#96bb7c")};
  border: 1px solid #fff;
  border-radius: 5px;
  overflow: auto;
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 10px;
  color: #fff;
  font-size: 18px;
`;

export default Notification;
