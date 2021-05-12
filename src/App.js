import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// components
import Home from "./components/Home";
import Login from "./components/Login";
import Establecimiento from "./components/Establecimiento";
// estilos
import "./styles/estilos.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/establecimientos">
          <Establecimiento />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
