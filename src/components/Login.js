import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleLogin = () => {
    axios
      .post("http://localhost:1337/auth/local", { identifier, password })
      .then((response) => {
        localStorage.setItem("usuario", JSON.stringify(response.data));
        history.push("/");
      });
  };
  return (
    <div>
      <label htmlFor="identifier">Email</label>
      <input
        id="identifier"
        onChange={(e) => setIdentifier(e.target.value)}
      ></input>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleLogin}>Iniciar Sesion</button>
    </div>
  );
};

export default Login;
