import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { getUserInfo } from "../utils/getUserInfo";

function MainPage() {
  const user = getUserInfo();
  console.log(localStorage.getItem("user"));

  if (!user.morador) {
    window.location.href = "/cadastro-morador";
  }

  const [trotes, setTrotes] = useState([
    { nome: "Gui", devendo: 2 },
    { nome: "João", devendo: 1 },
    { nome: "Pedro", devendo: 3 },
  ]);

  const [tarefas, setTarefas] = useState([
    { titulo: "Lavar louça", prazo: "Hoje" },
    { titulo: "Comprar papel higiênico", prazo: "Amanhã" },
  ]);

  const [transacoes, setTransacoes] = useState([
    { descricao: "Compra de comida", valor: "R$ 50,00" },
    { descricao: "Conta de luz", valor: "R$ 80,00" },
  ]);

  const adicionarTrote = () => {
    const nome = prompt("Nome do morador:");
    const devendo = prompt("Quantidade de trotes:");
    if (nome && devendo) {
      setTrotes([...trotes, { nome, devendo: parseInt(devendo) }]);
    }
  };

  const adicionarTarefa = () => {
    const titulo = prompt("Título da tarefa:");
    const prazo = prompt("Prazo da tarefa:");
    if (titulo && prazo) {
      setTarefas([...tarefas, { titulo, prazo }]);
    }
  };

  const adicionarTransacao = () => {
    const descricao = prompt("Descrição da transação:");
    const valor = prompt("Valor:");
    if (descricao && valor) {
      setTransacoes([...transacoes, { descricao, valor }]);
    }
  };

  const menuItems = [
    { label: "Perfil", icon: "pi pi-user", command: () => console.log("Perfil") },
    { label: "Galeria", icon: "pi pi-images", command: () => console.log("Galeria") },
    { label: "Calendário", icon: "pi pi-calendar", command: () => console.log("Calendário") },
    { label: "Finanças", icon: "pi pi-wallet", command: () => console.log("Finanças") },
  ];

  return (
    <div className="main-page">
      <Menubar model={menuItems} className="menu-bar" style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0"}} />

      <div className="content-grid" style={{borderTopLeftRadius: "0", borderTopRightRadius: "0"}}>
        {/* TROTES */}
        <Card title="Trotes">
          <ul>
            {trotes.map((morador, index) => (
              <li key={index}>
                {morador.nome} - {morador.devendo} trotes
              </li>
            ))}
          </ul>
          <Button label="Adicionar Trote" className="p-button-sm p-button-success" onClick={adicionarTrote} />
        </Card>

        {/* TAREFAS */}
        <Card title="Minhas Tarefas">
          <ul>
            {tarefas.map((tarefa, index) => (
              <li key={index}>
                {tarefa.titulo} - Prazo: {tarefa.prazo}
              </li>
            ))}
          </ul>
          <Button label="Adicionar Tarefa" className="p-button-sm p-button-primary" onClick={adicionarTarefa} />
        </Card>

        {/* FINANÇAS */}
        <Card title="Resumo Financeiro">
          <p>Saldo - Caixinha: R$ 340,00</p>
          <p>Meu saldo - Caixinha: R$ 120,00</p>
          <ul>
            {transacoes.map((transacao, index) => (
              <li key={index}>
                {transacao.descricao} - {transacao.valor}
              </li>
            ))}
          </ul>
          <Button label="Adicionar Transação" className="p-button-sm p-button-warning" onClick={adicionarTransacao} />
        </Card>
      </div>
    </div>
  );
}

export default MainPage;
