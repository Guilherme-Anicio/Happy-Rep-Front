import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function AdicionarTarefa() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [moradores, setMoradores] = useState<{ id: number; nome: string }[]>([]);
  const [moradores_associados, setMoradoresAssociados] = useState<number[]>([]);

  interface DecodedToken {
    id: string;
    email: string;
  }

  useEffect(() => {
    const fetchMoradores = async () => {
      try {
        const response = await axios.get("http://localhost:3000/morador");
        setMoradores(response.data);
      } catch (error) {
        console.error("Erro ao buscar moradores:", error);
      }
    };
    fetchMoradores();
  }, []);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
      return decodedToken.id;
    }
    return null;
  };

  const handleSubmit = async () => {
    const userId = getUserIdFromToken();
    console.log("id: ", userId);

    if (!userId) {
      alert("Usuário não está logado!");
      return;
    }

    const tarefaData = {
      nome,
      descricao,
      dataInicio: dataInicio ? dataInicio.toISOString().split("T")[0] : null,
      dataFim: dataFim ? dataFim.toISOString().split("T")[0] : null,
      concluida: false,
      moradores_associados: moradores_associados, 
    };

    try {
      const responseTarefa = await axios.post("http://localhost:3000/tarefa", tarefaData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Tarefa - response: ", responseTarefa.data);
      window.location.href = "/mainpage";
    } catch (error) {
      console.error("Erro ao cadastrar tarefa:", error);
      alert("Erro ao cadastrar tarefa. Tente novamente.");
    }
  };

  return (
    <div id="main-container" style={{ height: "80%" }}>
      <h1>Adicionando Tarefa</h1>
      <div id="input-container">
        <InputText className="menu-item" id="nome" placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
        <InputText className="menu-item" id="descricao" placeholder="Descrição" onChange={(e) => setDescricao(e.target.value)} />

        <Calendar
          className="menu-item"
          id="dataInicio"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.value as Date)}
          dateFormat="dd/mm/yy"
          placeholder="Data - Início"
        />

        <Calendar
          className="menu-item"
          id="dataFim"
          value={dataFim}
          onChange={(e) => setDataFim(e.value as Date)}
          dateFormat="dd/mm/yy"
          placeholder="Data - Fim"
        />

        <MultiSelect
          className="menu-item"
          id="moradoresAssociados"
          placeholder="Selecione os moradores"
          value={moradores_associados}
          options={moradores}
          onChange={(e) => setMoradoresAssociados(e.value)}
          optionLabel="apelido"
          optionValue="id"
          display="chip"
        />

        <Button className="menu-item" id="submit" label="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default AdicionarTarefa;
