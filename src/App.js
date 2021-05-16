import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// components
import Home from "./components/Home";
import Login from "./components/Login";
import EstablecimientoForm from "./components/EstablecimientoForm";
// estilos
import "./styles/estilos.css";
import { UserProvider } from "./components/core/UserContext";
import { EstablecimientoProvider } from "./components/core/EstablecimientoContext";
import { NoticiasProvider } from "./components/core/NoticiasContext";
import { NotificationProvider } from "./components/core/NotificationContext";
import Wrapper from "./components/core/Wrapper";
import Noticias from "./components/Noticias";
import NoticiasForm from "./components/NoticiasForm";
import Establecimientos from "./components/Establecimientos";
import Navbar from "./components/core/Navbar";

export default function App() {
  return (
    <Router>
      <NotificationProvider>
        <UserProvider>
          <EstablecimientoProvider>
            <NoticiasProvider>
              <header className="header">
                <div className="contenedor">
                  <Navbar />
                </div>
              </header>
              <Switch>
                <Route path="/establecimientos">
                  <Wrapper>
                    <EstablecimientoForm />
                  </Wrapper>
                </Route>
                <Route path="/login">
                  <Wrapper>
                    <Login />
                  </Wrapper>
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
                <Route path="/noticias">
                  <Noticias />
                </Route>
                <Route path="/add-noticias">
                  <Wrapper>
                    <NoticiasForm />
                  </Wrapper>
                </Route>
              </Switch>
            </NoticiasProvider>
          </EstablecimientoProvider>
        </UserProvider>
      </NotificationProvider>
    </Router>
  );
}
