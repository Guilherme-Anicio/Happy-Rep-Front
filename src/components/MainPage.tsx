import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";

function MainPage() {
  const [trotes, setTrotes] = useState([
    { nome: "Gui", devendo: 2 },
    { nome: "João", devendo: 1 },
    { nome: "Pedro", devendo: 3 },
  ]);

  const [tarefas, setTarefas] = useState([
    { titulo: "Lavar louça", prazo: "Hoje" },
    { titulo: "Comprar papel higiênico", prazo: "Amanhã" },
  ]);

  const menuItems = [
    { label: "Perfil", icon: "pi pi-user", command: () => console.log("Perfil") },
    { label: "Galeria", icon: "pi pi-images", command: () => console.log("Galeria") },
    { label: "Calendário", icon: "pi pi-calendar", command: () => console.log("Calendário") },
    { label: "Finanças", icon: "pi pi-wallet", command: () => console.log("Finanças") },
  ];

  return (
    <div className="main-page">
      <Menubar model={menuItems} className="menu-bar" />
      <div className="content-grid">
        <Card title="Trotes devidos">
          <ul>
            {trotes.map((morador, index) => (
              <li key={index}>{morador.nome} - {morador.devendo} trotes</li>
            ))}
          </ul>
        </Card>
        
        <Card title="Minhas Tarefas">
          <ul>
            {tarefas.map((tarefa, index) => (
              <li key={index}>{tarefa.titulo} - Prazo: {tarefa.prazo}</li>
            ))}
          </ul>
        </Card>
        
        <Card title="Resumo Financeiro">
          <p>Saldo: R$ 1.200,00</p>
          <p>Despesas do mês: R$ 850,00</p>
          <Button label="Ver detalhes" className="p-button-sm" />
        </Card>
      </div>
    </div>
  );
}

export default MainPage;