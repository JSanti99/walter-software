import { useEffect, useState } from "react";
import { useUser } from "./core/UserContext";

import styled from "styled-components";
import { useNotification } from "./core/NotificationContext";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useUser();
  const [notification, setNotification] = useState(null);
  const { open, handleRender } = useNotification();

  useEffect(() => {
    setNotification(handleRender());
  }, [open]);
  return (
    <>
      {notification}
      <Div>
        <Section>
          <Label htmlFor="identifier">Email</Label>
          <Input
            id="identifier"
            onChange={(e) => setIdentifier(e.target.value)}
          ></Input>
        </Section>
        <Section>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </Section>
        <Section>
          <Button onClick={() => handleLogin({ identifier, password })}>
            Iniciar Sesion
          </Button>
        </Section>
      </Div>
    </>
  );
};

const colorPrincipal = "#96bb7c";
const colorSecundario = "#252525";

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 10px;
  margin: auto;
  gap: 10px;
  margin-bottom: auto;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Label = styled.label`
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  color: ${colorSecundario};
  font-weight: bold;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  background: ${colorPrincipal};
  border: none;
  border-radius: 3px;
  color: #fff;
  :focus {
    outline: none;
  }
`;

const Select = styled.select`
  font-size: 18px;
  padding: 10px;
  background: ${colorPrincipal};
  border: none;
  border-radius: 3px;
  color: #fff;
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop*/
  background: ${colorPrincipal};
  color: #fff;
  font-size: 18px;
  padding: 0.25em 1em;
  border: 2px solid ${colorSecundario};
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
`;

export default Login;
