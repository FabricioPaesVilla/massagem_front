
// src/pages/agendamentoSessao/index.js
import AgendaSchedule from '../../components/agendaSchedule';

export default function AgendamentoSessaoPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Agenda do dia</h1>
      <AgendaSchedule />
    </main>
  );
}
