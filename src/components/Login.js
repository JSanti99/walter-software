import { useState } from "react";
import { useUser } from "./core/UserContext";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useUser();
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
      <button onClick={() => handleLogin({ identifier, password })}>
        Iniciar Sesion
      </button>
    </div>
  );
};

export default Login;
