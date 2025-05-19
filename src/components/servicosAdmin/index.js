import React, { useState } from 'react';
import './index.scss';
import axios from 'axios';


export default function ServicosAdmin() {
  const [imagem, setImagem] = useState(null);
  const [imagemArquivo, setImagemArquivo] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const manipulaImagem = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(URL.createObjectURL(file));
      setImagemArquivo(e.target.files[0]);
    }
  };

  // Aqui vai a lógica para salvar no backend
  const salvarMassagem = async () => {
    if (!nome || !descricao || !imagem) {
      alert("Preencha todos os campos.");
      return;
    }


    try {

      const massagemRes = await axios.post("http://localhost:5010/massagem", {
        titulo: nome,
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
    setNome('');
    setDescricao('');
  };

  const carregarMassagem = async () =>{

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
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição da Massagem..*"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button className="carregar-btn" onClick={carregarMassagem}>Carregar massagem existente</button>
        <button className="aplicar-btn" onClick={salvarMassagem}>Salvar</button>
      </div>
    </div>
  );
}
