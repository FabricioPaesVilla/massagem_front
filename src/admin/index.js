import React, { useState } from 'react';
import AgendamentosAdmin from '../pages/adminPage';
import ServicosAdmin from '../components/servicosAdmin';
import './index.scss'; 

export default function Admin() {
  const [abaAtiva, setAbaAtiva] = useState('agendamentos');

  return (
    <div className="admin-container">
      <div className="admin-menu">
        <button
          className={abaAtiva === 'agendamentos' ? 'ativo' : ''}
          onClick={() => setAbaAtiva('agendamentos')}
        >
          Agendamentos
        </button>
        <button
          className={abaAtiva === 'servicos' ? 'ativo' : ''}
          onClick={() => setAbaAtiva('servicos')}
        >
          Serviços
        </button>
      </div>

      <main>
        {abaAtiva === 'agendamentos' && <AgendamentosAdmin />}
        {abaAtiva === 'servicos' && <ServicosAdmin />}
      </main>
    </div>
  );
}
