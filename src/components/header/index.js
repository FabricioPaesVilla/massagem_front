import React from "react";
import "./index.scss";
import logo from "../../images/logo.png";
import seta from "../../images/seta.png";

export default function Header() {
  return (
    <header className="main-header">
      <div className="overlay">
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

            <button className="botaoAgendarSessao">
              Agendar Sessão
              <img src={seta} alt="seta" style={{ marginLeft: '5px', verticalAlign: 'middle', height: '1rem' }}></img> 
              </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
