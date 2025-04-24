import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import logo from "../../images/logo.png";
import seta from "../../images/seta.png";

export default function Header() {
  return (
    <header className="main-header">
      <div className="container">
        <div className="logoirinha">
          <img src={logo} alt="Logoirinha" />
        </div>

        <nav className="menu">
          <a className="inicio" href="#home">
            Início
          </a>
          <a href="#massagens">Massagens</a>
          <a href="#contato">Contato</a>

          <Link to="/login">
            <button className="botaoAgendarSessao">
              Agendar Sessão
              <img src={seta} alt="seta" className="seta-icon" />
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
