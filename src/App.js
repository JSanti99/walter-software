import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// components
import Home from "./components/Home";
import Login from "./components/Login";
import EstablecimientoForm from "./components/EstablecimientoForm";
// estilos
import "./styles/estilos.css";
import Navbar from "./components/core/Navbar";
import Establecimientos from "./components/Establecimientos";
import { UserProvider } from "./components/core/UserContext";
import { EstablecimientoProvider } from "./components/core/EstablecimientoContext";

export default function App() {
  return (
    <Router>
      <UserProvider>
        <EstablecimientoProvider>
          <header className="header">
            <div className="contenedor">
              <Navbar />
            </div>
          </header>
          <Switch>
            <Route path="/establecimientos">
              <EstablecimientoForm />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/hoteles">
              <Establecimientos tipo={"hotel"} />
            </Route>
            <Route path="/restaurantes">
              <Establecimientos tipo={"restaurante"} />
            </Route>
            <Route path="/turisticos">
              <Establecimientos tipo={"turistico"} />
            </Route>
            <Route path="/entretenimiento">
              <Establecimientos tipo={"entretenimiento"} />
            </Route>
            <Route path="/negocios">
              <Establecimientos tipo={"tradicional"} />
            </Route>
          </Switch>
        </EstablecimientoProvider>
      </UserProvider>
    </Router>
  );
}
