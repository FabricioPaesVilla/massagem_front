import React, { useState } from 'react';
import './index.scss';
import axios from 'axios';


const respMassagem = await axios.get("http://localhost:5010/massagem");

const massagem = respMassagem.data;

export default function ServicosAdmin() {
  const [imagem, setImagem] = useState(null);
  const [imagemArquivo, setImagemArquivo] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const [id_massagem, setId_massagem] = useState(null);


  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalTipo, setModalTipo] = useState("novo");

  const manipulaImagem = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(URL.createObjectURL(file));
      setImagemArquivo(e.target.files[0]);
    }
  };

  // Aqui vai a lógica para salvar no backend
  const salvarMassagem = async () => {
    if (!titulo || !descricao || !imagem) {
      alert("Preencha todos os campos.");
      return;
    }


    try {

      const massagemRes = await axios.post("http://localhost:5010/massagem", {
        titulo: titulo,
        descricao: descricao
      });

      const idMassagem = massagemRes.data.id || massagemRes.data.insertId;

      const formData = new FormData();
      formData.append("imagem", imagemArquivo);

      await axios.post(`http://localhost:5010/imagem/${idMassagem}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Massagem cadastrada com sucesso!");
      /*
      setImagem(null);
      setImagemArquivo(null);
      setNome('');
      setDescricao('');
      */
    } catch (err) {
      console.error("Erro ao salvar massagem:", err);
      alert("Erro ao salvar massagem.");

    }

    // Resetar campos após aplicar
    setImagem(null);
    setImagemArquivo(null);
    setTitulo('');
    setDescricao('');
  };

  const carregarMassagem = async () => {

  }

  function Cancelar() {
    setModalVisivel(false);
  }



async function excluir(id) {
    try {
      await axios.delete(`http://localhost:5010/imagem/${id}`);
      await axios.delete(`http://localhost:5010/massagem/${id}`);

      setId_massagem(null);

      setModalVisivel(false)
    } catch (error) {
      console.error("Erro ao excluir agendamento");
      console.error(error);
    }
  }















  return (
    <div className="servicos-admin">
      <img src="/static/media/logo.be150ccfcd6fd86e81b5.png" alt="Logo Irinha Dias" className="logo" />

      <div className="upload-area">
        <label htmlFor="upload-img" className="upload-label">
          {imagem ? (
            <img src={imagem} alt="Pré-visualização" className="preview" />
          ) : (
            <div className="placeholder">
              <span role="img" aria-label="upload">📷</span>
              <p>Carregar imagem da massagem</p>
            </div>
          )}
        </label>
        <input
          type="file"
          id="upload-img"
          accept="image/*"
          onChange={manipulaImagem}
        />
      </div>

      <div className="formulario">
        <input
          type="text"
          placeholder="Massagem..*"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição da Massagem..*"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button className="aplicar-btn" onClick={salvarMassagem}>Salvar</button>
        <button className="carregar-btn" onClick={() => { carregarMassagem(); setModalVisivel(true); setModalTipo("existente"); }}>Excluir massagem existente</button>

        {modalVisivel && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setModalVisivel(false)}>
                &times;
              </span>
              <h3>
                {modalTipo === "existente" ? "excluir massagem" : "excluir massagem"}
              </h3>
              <label>
                Tipo de Massagem:
                <select
                  value={id_massagem}
                  onChange={
                    //(e) => setTitulo(e.target.value)
                    (e) => setId_massagem(e.target.value)
                  }
                >

                  {massagem.map((item, index) => (
                    /*
                    <div className="card" key={index}>
                      <option value={item.id_massagem}>{item.titulo}</option>
                    </div>
                    */
                    <option key={index} value={item.id_massagem}>
                      {item.titulo}
                    </option>

                  ))}

                </select>
              </label>
              <button onClick={() => excluir(id_massagem)}>Excluir</button>
              <button onClick={Cancelar}>Cancelar</button>
            </div>
          </div>
        )}





      </div>
    </div>
  );
}
