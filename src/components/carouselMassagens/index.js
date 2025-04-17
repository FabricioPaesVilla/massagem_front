import React, { useRef } from "react";
import "./index.scss";
import relaxamento from "../../images/relaxamento.jpg";
import drenagem from "../../images/drenagem.jpg";
import modeladora from "../../images/modeladora.jpg";
import shiatsu from "../../images/shiatsu.jpg";
import shirodara from "../../images/shirodara.jpg";
import liberacaoFacial from "../../images/liberação facial.jpg";
import desportiva from "../../images/depostiva.jpg";

const massagens = [
  {
    titulo: "RELAXAMENTO",
    texto: "A MASSAGEM DE RELAXAMENTO ALIVIA O ESTRESSE E A TENSÃO MUSCULAR...",
    imagem: relaxamento,
  },

  {
    titulo: "DRENAGEM",
    texto:
      "A MASSAGEM DE DRENAGEM ESTIMULA O SISTEMA LINFÁTICO, REDUZINDO INCHAÇOS...",
    imagem: drenagem,
  },
  {
    titulo: "MODELADORA",
    texto:
      "A MASSAGEM MODELADORA UTILIZA MOVIMENTOS FIRMES PARA ESTIMULAR A CIRCULAÇÃO...",
    imagem: modeladora,
  },
  {
    titulo: "SHIATSU",
    texto:
      "O SHIATSU É UMA MASSAGEM TERAPÊUTICA QUE USA PRESSÃO DOS DEDOS PARA ALIVIAR DORES...",
    imagem: shiatsu,
  },

  {
    titulo: "Shirodara",
    texto:
      "Shirodara: técnica ayurvédica que derrama óleo morno na testa, promovendo relaxamento profundo e equilíbrio mental.",
    imagem: shirodara,
  },

  {
    titulo: "Liberação Facial",
    texto:
      "Técnica suave que relaxa a fáscia do rosto, aliviando tensões e promovendo bem-estar e rejuvenescimento natural.",
    imagem: liberacaoFacial,
  },

  {
    titulo: "Massagem Desportiva",
    texto:
      "A massagem desportiva previne lesões, melhora o desempenho e acelera a recuperação muscular.",
    imagem: desportiva,
  },
];

export default function CarouselMassagens() {
  const carouselRef = useRef(null);

  const scroll = (offset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="massagens-total">
      <h2>Conheça as massagens realizadas</h2>
      <div className="carousel-container">
        <button className="nav-btn prev" onClick={() => scroll(-300)}>
          &#8249;
        </button>
        <div className="carousel" ref={carouselRef}>
          {massagens.map((item, index) => (
            <div className="card" key={index}>
              <p>{item.texto}</p>

              <img src={item.imagem} alt={item.titulo} />

              <h3>{item.titulo}</h3>
            </div>
          ))}
        </div>
        <button className="nav-btn next" onClick={() => scroll(300)}>
          &#8250;
        </button>
      </div>
    </section>
  );
}
