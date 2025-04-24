
import { useState } from "react";
import "../agendaSchedule";

export default function AgendaSchedule() {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [appointments, setAppointments] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const emptyForm = { time: "", client: "", service: "" };
  const [form, setForm] = useState(emptyForm);

  const periods = [
    { key: "morning", label: "Manhã", range: "06h-11h", start: 6, end: 11 },
    { key: "afternoon", label: "Tarde", range: "13h-18h", start: 13, end: 18 },
    { key: "night", label: "Noite", range: "19h-21h", start: 19, end: 21 },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    if (editingId) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...form } : a))
      );
    } else {
      setAppointments((prev) => [...prev, { id: crypto.randomUUID(), ...form }]);
    }
    closeDialog();
  }

  function removeAppointment(id) {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  }

  function openDialog(app = null) {
    if (app) {
      setForm({ time: app.time, client: app.client, service: app.service });
      setEditingId(app.id);
    } else {
      setForm(emptyForm);
      setEditingId(null);
    }
    setDialogOpen(true);
  }
  function closeDialog() {
    setDialogOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  }

  return (
    <div className="agenda-container">
      {/* Cabeçalho */}
      <header className="agenda-header">
        <h2>Sua Agenda</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </header>

      {/* Períodos */}
      {periods.map((p) => {
        const list = appointments.filter((a) => {
          const hour = parseInt(a.time.split(":")[0], 10);
          return hour >= p.start && hour <= p.end;
        });
        return (
          <section key={p.key} className="period-card">
            <div className="period-title">
              <span>{p.label}</span>
              <span className="range">{p.range}</span>
            </div>
            <table>
              <tbody>
                {list.length === 0 && (
                  <tr>
                    <td colSpan={4} className="empty">Sem agendamentos.</td>
                  </tr>
                )}
                {list.map((a) => (
                  <tr key={a.id}>
                    <td className="time-col">{a.time}</td>
                    <td>{a.client}</td>
                    <td>{a.service}</td>
                    <td className="actions">
                      <button onClick={() => openDialog(a)}>Editar</button>
                      <button className="remove" onClick={() => removeAppointment(a.id)}>
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      })}

      <button className="new-btn" onClick={() => openDialog()}>
        Novo agendamento
      </button>

      {/* Dialog simples */}
      {dialogOpen && (
        <div className="dialog-backdrop" onClick={closeDialog}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId ? "Editar" : "Novo"} agendamento</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Horário
                <input
                  type="time"
                  required
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </label>
              <label>
                Cliente
                <input
                  required
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                />
              </label>
              <label>
                Serviço
                <input
                  required
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                />
              </label>
              <div className="dialog-actions">
                <button type="button" onClick={closeDialog}>
                  Cancelar
                </button>
                <button type="submit">{editingId ? "Salvar" : "Adicionar"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
