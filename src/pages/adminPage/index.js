import React, { useState } from 'react';
import './index.scss';
import { FaEdit, FaTrash, FaListUl } from 'react-icons/fa';
import PreHeader from '../../components/pre-header';
import Header from '../../components/header';
import Footer from '../../components/footer';

const Agenda = () => {
  const [agendamentos, setAgendamentos] = useState([
    { id: 1, horario: '06:30', nome: 'Fernanda Almeida', servico: 'Modeladora', periodo: 'manha' },
    { id: 2, horario: '09:00', nome: 'Isabela Gomes', servico: 'Drenagem', periodo: 'manha' },
    { id: 3, horario: '10:50', nome: 'Fernando Tavarez', servico: 'Relaxamento', periodo: 'manha' },
    { id: 4, horario: '13:00', nome: 'Melissa Fonseca', servico: 'Shiatsu', periodo: 'tarde' },
    { id: 5, horario: '14:00', nome: 'Henrique Conceição', servico: 'Relaxamento', periodo: 'tarde' },
    { id: 6, horario: '15:00', nome: 'Fabricio Paes', servico: 'Shirodhara', periodo: 'tarde' },
    { id: 7, horario: '19:30', nome: 'Giovanna Munte', servico: 'Drenagem', periodo: 'noite' },
    { id: 8, horario: '20:00', nome: 'Elisa Dias', servico: 'Miofascial', periodo: 'noite' },
    { id: 9, horario: '20:30', nome: 'Bruno de Oliveira', servico: 'Relaxamento', periodo: 'noite' }
  ]);

  const [agendamentoEditado, setAgendamentoEditado] = useState(null);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [agendamentoParaExcluir, setAgendamentoParaExcluir] = useState(null);

  const removerAgendamento = (id) => {
    setShowModalExcluir(true);
    setAgendamentoParaExcluir(id);
  };

  const excluirAgendamento = () => {
    setAgendamentos(agendamentos.filter(item => item.id !== agendamentoParaExcluir));
    setShowModalExcluir(false);
    setAgendamentoParaExcluir(null);
  };

  const cancelarExcluir = () => {
    setShowModalExcluir(false);
    setAgendamentoParaExcluir(null);
  };

  const editarAgendamento = (id) => {
    const agendamento = agendamentos.find(item => item.id === id);
    setAgendamentoEditado({ ...agendamento });
  };

  const salvarEdicao = () => {
    setAgendamentos(agendamentos.map(item =>
      item.id === agendamentoEditado.id ? agendamentoEditado : item
    ));
    setAgendamentoEditado(null);
  };

  const cancelarEdicao = () => {
    setAgendamentoEditado(null);
  };

  const listarAgendamentos = () => {
    console.log('Agendamentos atuais:', agendamentos);
  };

  const renderizarAgendamentos = (periodo, titulo, hora) => (
    <div className="bloco-periodo">
      <div className="cabecalho-periodo">
        <span className="icone-periodo">☀️</span>
        <strong>{titulo}</strong>
        <span className="hora-periodo">{hora}</span>
      </div>
      {agendamentos.filter(a => a.periodo === periodo).map(item => (
        <div key={item.id} className="linha-agendamento">
          <span className="hora">{item.horario}</span>
          <span className="nome"><strong>{item.nome}</strong></span>
          <span className="servico">{item.servico}</span>
          <div className="acoes">
            <button onClick={() => editarAgendamento(item.id)} title="Editar">
              <FaEdit />
            </button>
            <button onClick={() => removerAgendamento(item.id)} title="Remover">
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <PreHeader />
      <Header />

      <div className="agenda-container">
        <div className="topo-agenda">
          <h2>Sua Agenda</h2>
          <p>Aqui você pode ver todos os clientes e serviços agendados para hoje.</p>
          <div className="botoes-topo">
            <button onClick={listarAgendamentos} title="Listar Agendamentos">
              <FaListUl size={18} />
            </button>
          </div>
        </div>

        {renderizarAgendamentos('manha', 'Manhã', '6h–11h')}
        {renderizarAgendamentos('tarde', 'Tarde', '13h–18h')}
        {renderizarAgendamentos('noite', 'Noite', '19h–21h')}

        {agendamentoEditado && (
          <div className="form-editar">
            <h3>Editar Agendamento</h3>
            <label>
              Nome:
              <input
                type="text"
                value={agendamentoEditado.nome}
                onChange={(e) => setAgendamentoEditado({ ...agendamentoEditado, nome: e.target.value })}
              />
            </label>
            <label>
              Horário:
              <input
                type="text"
                value={agendamentoEditado.horario}
                onChange={(e) => setAgendamentoEditado({ ...agendamentoEditado, horario: e.target.value })}
              />
            </label>
            <label>
              Serviço:
              <input
                type="text"
                value={agendamentoEditado.servico}
                onChange={(e) => setAgendamentoEditado({ ...agendamentoEditado, servico: e.target.value })}
              />
            </label>
            <div className="acoes-editar">
              <button onClick={salvarEdicao}>Salvar</button>
              <button onClick={cancelarEdicao}>Cancelar</button>
            </div>
          </div>
        )}

        <div className="rodape-agenda">
          <button className="btn-novo">Novo Agendamento</button>
        </div>
      </div>

      {showModalExcluir && (
        <div className="modal">
          <div className="modal-conteudo">
            <h4>Tem certeza que deseja excluir este agendamento?</h4>
            <div className="acoes-modal">
              <button onClick={excluirAgendamento}>Excluir</button>
              <button onClick={cancelarExcluir}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Agenda;
