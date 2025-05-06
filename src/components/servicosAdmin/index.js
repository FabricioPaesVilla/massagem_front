import React, { useState } from 'react';
import './index.scss';

export default function ServicosAdmin() {
  const [imagem, setImagem] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(URL.createObjectURL(file));
    }
  };

  const handleAplicar = () => {
    if (!nome || !descricao || !imagem) {
      alert("Preencha todos os campos.");
      return;
    }

    // Aqui vai a lógica para salvar no backend
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
