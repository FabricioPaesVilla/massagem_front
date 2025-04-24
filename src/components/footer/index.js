import React from "react";
import "./index.scss";

export default function Footer() {
  return (
    <div className="footer">
      <footer>
        <div className="coluna">
          <h3>Links Rápidos</h3>
          <ul>
            <li>Sobre</li>
            <li>Serviços</li>
            <li>Agendamento</li>
          </ul>
        </div>

        <div className="coluna">
          <h3>Contatos</h3>
          <p>irinha@gmail.com</p>
          <p>(11)9669-9966</p>
        </div>

        <div className="coluna">
          <h3>Horário de Atendimento</h3>
          <p>Segunda a Sexta: 09h às 19h</p>
          <p>Sábado: 09h às 14h</p>
          <p>Domingo: Fechado</p>
        </div>
      </footer>
      <div className="footer-bottom">
        <p>Desenvolvido por <strong>UniFive</strong></p>
        <p>© 2025 Irinha Dias Massoterapia – Todos os direitos reservados.</p>
      </div>
    </div>
  );
}
