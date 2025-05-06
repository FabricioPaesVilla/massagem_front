import React from "react";
import "./index.scss";
//import seta from "../../images/seta.png";
//import { Link } from 'react-router-dom'
import PreHeader from "../../components/pre-header";
import Header from "../../components/header";
import Banner from "../../images/bannerHome.png";
import CarouselMassagens from "../../components/carouselMassagens";
import ProfileImage from "../../images/profile.jpeg";
import Footer from "../../components/footer";

export default function Home() {
  return (
    <div className="pagina-home">
      <section>
        <PreHeader />
        <Header />
        <main>
          <div class="banner-principal">
            <img src={Banner} alt="banner" />
            <button class="botaoSaibaMais">Saiba Mais</button>
          </div>
          <CarouselMassagens />
          <div className="sobre-massagista">
            <h2 className="titulo">Sobre a Massagista</h2>

            <div className="card-massagista">
              <div className="image-container">
                <img
                  src={ProfileImage}
                  alt="Iracema Dias"
                  className="profile-image"
                />
                <div className="name">Iracema Dias</div>
              </div>

              <div className="text-container">
                <p className="description">
                  Olá eu sou a Iracema Dias de Almeida, mas sou conhecida como
                  Irinha Dias. Trabalho na área de massagem há 30 anos, vou com
                  minha maca e meus produtos para a casa dos meus clientes,
                  trabalho dentro de São Paulo. Aqui no site você pode ver as
                  massagens com que eu trabalho e meus contatos para caso de
                  desejar uma consulta futura.
                </p>
              </div>
            </div>
          </div>
        </main>
      </section>

      
      <Footer />
    </div>
  );
}
