import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../utils/getUserInfo";
import { Menubar } from "primereact/menubar";
import { Card } from "primereact/card";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

function MainPage() {
  const navigate = useNavigate();
  const user = getUserInfo();
  console.log(user);

  if (!user.morador) {
    window.location.href = "/cadastro-morador";
  }

  const [moradores, setMoradores] = useState([]);
  const [trotes, setTrotes] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [transacoes, setTransacoes] = useState([
    { descricao: "Compra de comida", valor: "R$ 50,00" },
    { descricao: "Conta de luz", valor: "R$ 80,00" },
  ]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar o modal
  const [moradorSelecionado, setMoradorSelecionado] = useState(null); // Estado para o morador selecionado
  const [quantidadeTrotes, setQuantidadeTrotes] = useState(0); // Estado para a quantidade de trotes a ser adicionada

  const menuItems = [
    { label: "Perfil", icon: "pi pi-user", command: () => console.log("Perfil") },
    { label: "Galeria", icon: "pi pi-images", command: () => console.log("Galeria") },
    { label: "Calendário", icon: "pi pi-calendar", command: () => console.log("Calendário") },
    { label: "Finanças", icon: "pi pi-wallet", command: () => console.log("Finanças") },
  ];

  const fetchMoradores = async () => {
    try {
      const response = await axios.get("http://localhost:3000/morador");
      const moradoresData = response.data;
      setMoradores(moradoresData);
      console.log("moradores: ", moradores);

      const trotesAtualizados = moradoresData.map((morador: any) => ({
        nome: morador.apelido,
        devendo: morador.trotes,
      }));

      setTrotes(trotesAtualizados);
      console.log("Trotes atualizados:", trotesAtualizados);
    } catch (error) {
      console.error("Erro ao buscar moradores:", error);
    }
  };

  const fetchTarefas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tarefa");
      const todasTarefas = response.data;

      const tarefasFiltradas = todasTarefas.filter((tarefa: any) =>
        tarefa.moradores_associados.some((morador: any) => morador.id === user.morador.id)
      );

      setTarefas(tarefasFiltradas);
      console.log("Tarefas filtradas:", tarefasFiltradas);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchMoradores();
    fetchTarefas();
  }, []);

  const adicionarTrote = () => {
    setModalVisible(true); // Exibir o modal
  };

  const confirmarAdicaoDeTrote = () => {
    if (moradorSelecionado && quantidadeTrotes > 0) {
      // Atualiza o estado de trotes com base no morador selecionado
      const trotesAtualizados = trotes.map((morador) =>
        morador.nome === moradorSelecionado
          ? { ...morador, devendo: morador.devendo + quantidadeTrotes }
          : morador
      );
      setTrotes(trotesAtualizados);
      setModalVisible(false); // Fechar o modal
      setMoradorSelecionado(null);
      setQuantidadeTrotes(0);
    }
  };

  return (
    <div className="main-page">
      <Menubar model={menuItems} className="menu-bar" style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} />

      <div className="content-grid" style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
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
          <Button label="Adicionar Tarefa" className="p-button-sm p-button-primary" onClick={() => navigate("/adicionar-tarefa")} />
          <ul>
            {tarefas.map((tarefa, index) => (
              <li key={index} onMouseEnter={() => setTarefaSelecionada(tarefa)} onMouseLeave={() => setTarefaSelecionada(null)}>
                <strong>{tarefa.nome}</strong> - <span>{tarefa.dataFim}</span>

                {tarefaSelecionada && tarefaSelecionada.id === tarefa.id && (
                  <div className="descricao-tarefa">
                    <p>{tarefa.descricao}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
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
          <Button label="Adicionar Transação" className="p-button-sm p-button-warning" onClick={() => setTransacoes([...transacoes, { descricao: 'Nova transação', valor: 'R$ 0,00' }])} />
        </Card>
      </div>

      {/* Modal para Seleção de Morador */}
      <Dialog header="Adicionar Trote" visible={modalVisible} onHide={() => setModalVisible(false)} style={{ width: "400px" }}>
        <div>
          <label htmlFor="morador">Selecione o Morador</label>
          <select
            id="morador"
            value={moradorSelecionado || ""}
            onChange={(e) => setMoradorSelecionado(e.target.value)}
          >
            <option value="">Selecione um morador</option>
            {moradores.map((morador: any) => (
              <option key={morador.id} value={morador.apelido}>
                {morador.apelido}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantidadeTrotes">Quantidade de Trotes</label>
          <InputText
            id="quantidadeTrotes"
            value={quantidadeTrotes}
            onChange={(e) => setQuantidadeTrotes(parseInt(e.target.value))}
          />
        </div>
        <div className="p-d-flex p-jc-between">
          <Button label="Cancelar" className="p-button-text" onClick={() => setModalVisible(false)} />
          <Button label="Confirmar" className="p-button-success" onClick={confirmarAdicaoDeTrote} />
        </div>
      </Dialog>
    </div>
  );
}

export default MainPage;
