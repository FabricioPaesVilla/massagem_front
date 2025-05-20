

import { useState, useEffect } from "react";
import "./index.scss";
import { FaListUl, FaSun, FaMoon, FaCloudSun } from "react-icons/fa";
import PreHeader from "../../components/pre-header";
import Header from "../../components/header";
import Footer from "../../components/footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const resp = await axios.get("http://localhost:5010/massagem");

const massagem = resp.data;
export default function Agenda() {
  const [listaAgendamentos, setListaAgendamentos] = useState([]);
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [nome_cliente, setNome_cliente] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tipo_massagem, setTipo_massagem] = useState("");
  const [idAgendamento, setIdAgendamento] = useState(null);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalTipo, setModalTipo] = useState("novo");

  useEffect(() => {
    listar();
  }, []);

  async function listar() {
    try {
      const resp = await axios.get("http://localhost:5010/agenda");
      if (Array.isArray(resp.data)) {
        setListaAgendamentos(resp.data);
      } else {
        toast.error("Erro: dados de agendamento não encontrados.");
      }
    } catch (error) {
      toast.error("Erro ao listar agendamentos");
      console.error(error);
    }
  }

  async function salvar() {
    try {
      const corpo = {
        dia,
        nome_cliente,
        hora,
        endereco,
        tipo_massagem,
      };

      if (modalTipo === "editar") {
        const resp = await axios.put(`http://localhost:5010/agenda/${idAgendamento}`, corpo);
        toast.success(`Agendamento editado!`);
      } else {
        const resp = await axios.post("http://localhost:5010/agenda", corpo);
        toast.success(`Agendamento criado! (ID: ${resp.data.novoId || "?"})`);
      }

      limpar();
      listar();
      setModalVisivel(false);
    } catch (error) {
      toast.error("Erro ao salvar agendamento");
      console.error(error);
    }
  }

  async function excluir(id) {
    try {
      await axios.delete(`http://localhost:5010/agenda/${id}`);
      toast.success("Agendamento excluído!");
      listar();
    } catch (error) {
      toast.error("Erro ao excluir agendamento");
      console.error(error);
    }
  }

  function limpar() {
    setDia("");
    setHora("");
    setNome_cliente("");
    setEndereco("");
    setTipo_massagem("");
    setIdAgendamento(null);
  }

  function Cancelar() {
    setModalVisivel(false);
    limpar();
  }

  function determinarPeriodo(horario) {
    if (!horario) return "indefinido";
    const [hr] = horario.split(":").map(Number);
    if (hr < 12) return "manha";
    if (hr < 18) return "tarde";
    return "noite";
  }

  function renderIconePeriodo(periodo) {
    switch (periodo) {
      case "manha":
        return <FaSun />;
      case "tarde":
        return <FaCloudSun />;
      case "noite":
        return <FaMoon />;
      default:
        return null;
    }
  }



  function renderizarAgendamentos(periodo, titulo, horaTexto) {
    return (
      <div className="bloco-periodo">
        <div className="cabecalho-periodo">
          <span className="icone-periodo">{renderIconePeriodo(periodo)}</span>
          <strong>{titulo}</strong>
          <span className="hora-periodo">{horaTexto}</span>
        </div>

        {listaAgendamentos
          .filter((a) => determinarPeriodo(a.hora) === periodo)
          .map((item) => (
            <div key={item.id} className="linha-agendamento">
              <span className="hora">{item.hora}</span>
              <span className="data">
                {new Date(item.dia).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span className="nome">
                <strong>{item.cliente}</strong>
              </span>
              <span>{item.endereço}</span>
              <span>{item.tipo_massagem}</span>

              {/* Botões de Editar e Excluir*/}
              <div className="acoes">
                <button
                  className="editar"
                  onClick={() => {
                    setModalVisivel(true);
                    setModalTipo("editar");
                    setIdAgendamento(item.id);
                    setDia(item.dia);
                    setHora(item.hora);
                    setNome_cliente(item.nome_cliente);
                    setEndereco(item.endereco);
                    setTipo_massagem(item.tipo_massagem);
                  }}
                >
                  Editar
                </button>
                <button
                  className="excluir"
                  onClick={() => excluir(item.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div>
      <PreHeader />
      <Header />

      <div className="agenda-container">
        <div className="topo-agenda">
          <h2>Sua Agenda</h2>
          <p>Acompanhe os agendamentos do dia por período.</p>
          <div className="botoes-topo">
            <button onClick={listar}>
              <FaListUl size={18} />
            </button>
          </div>
        </div>

        {renderizarAgendamentos("manha", "Manhã", "06h–11h")}
        {renderizarAgendamentos("tarde", "Tarde", "12h–18h")}
        {renderizarAgendamentos("noite", "Noite", "19h–22h")}

        <div className="form-novo">
          <button
            onClick={() => {
              setModalVisivel(true);
              setModalTipo("novo");
            }}
          >
            Criar Novo Agendamento
          </button>
        </div>

        {/* Modal de Novo Agendamento */}
        {modalVisivel && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setModalVisivel(false)}>
                &times;
              </span>
              <h3>
                {modalTipo === "novo"
                  ? "Novo Agendamento"
                  : "Editar Agendamento"}
              </h3>
              <label>
                Data:{" "}
                <input
                  type="date"
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                />
              </label>

              <label>
                Hora:{" "}
                <input
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                />
              </label>
              <br></br>
              <label>
                Cliente:{" "}
                <input
                  value={nome_cliente}
                  onChange={(e) => setNome_cliente(e.target.value)}
                />
              </label>
              <br></br>
              <label>
                Endereço:{" "}
                <input
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </label>
              <br></br>
              <label>
                Tipo de Massagem:
                <select
                  value={tipo_massagem}
                  onChange={(e) => setTipo_massagem(e.target.value)}
                >

                  {massagem.map((item, index) => (
                    <div className="card" key={index}>
                      <option value={item.titulo}>{item.titulo}</option>
                    </div>
                  ))}

                </select>
              </label>
              <button onClick={salvar}>Salvar</button>
              <button onClick={Cancelar}>Cancelar</button>
            </div>
          </div>
        )}
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
}

