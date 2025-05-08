import React, { useState } from 'react';
import './index.scss';
import axios from 'axios';


export default function ServicosAdmin() {
  const [imagem, setImagem] = useState(null);
  const [imagemArquivo, setImagemArquivo] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(URL.createObjectURL(file));
    }
  };

  const handleAplicar = async() => {
    if (!nome || !descricao || !imagem) {
      alert("Preencha todos os campos.");
      return;
    }

    // Aqui vai a lógica para salvar no backend

    try {
      // 1. Salvar massagem
      const massagemRes = await axios.post("http://localhost:5010/massagem", {
        titulo: nome,
        descricao: descricao,
        img: imagemArquivo.name, // apenas o nome do arquivo no banco
      });

      const idMassagem = massagemRes.data.id || massagemRes.data.insertId;

      // 2. Enviar imagem (como multipart/form-data)
      const formData = new FormData();
      formData.append("imagem", imagemArquivo);

      await axios.post(`http://localhost:5010/massagem/${idMassagem}/imagem`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Massagem cadastrada com sucesso!");
      // Resetar campos após aplicar
      setImagem(null);
      setImagemArquivo(null);
      setNome('');
      setDescricao('');
    } catch (err) {
      console.error("Erro ao salvar massagem:", err);
      alert("Erro ao salvar massagem.");
    }

    //--------------
    console.log({
      nome,
      descricao,
      imagem
    });

    // Resetar campos após aplicar
    setImagem(null);
    setNome('');
    setDescricao('');
  };

  return (
    <div className="servicos-admin">
      <img src="/logo-irinha.png" alt="Logo Irinha Dias" className="logo" />

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
          onChange={handleImagemChange}
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

        <button className="carregar-btn">Carregar massagem existente</button>
        <button className="aplicar-btn" onClick={handleAplicar}>Aplicar</button>
      </div>
    </div>
  );
}
