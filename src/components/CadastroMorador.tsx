import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from 'axios';
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function CadastroMorador() {

const [apelido, setApelido] = useState("");
const [cargo, setCargo] = useState("");
const [periodo, setPeriodo] = useState("");
const [curso, setCurso] = useState("");
const [turno_curso, setTurnoCurso] = useState("");
const [cidade_de_origem, setCidadeDeOrigem] = useState("");

interface DecodedToken {
  id: string;
  email: string;
}

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
    console.log("id: ", userId)

    if (!userId) {
      alert("Usuário não está logado!");
      return;
    }
    
    const moradorData = {
      usuarioId: userId,
      apelido: apelido,
      cargo: cargo,
      periodo: periodo,
      curso: curso,
      turno_curso: turno_curso,
      cidade_de_origem: cidade_de_origem
    };

    try {
      const responseMorador = await axios.post("http://localhost:3000/morador", moradorData, {
        headers: { "Content-Type": "application/json" }
      });
      const responseUsuario = await axios.put(`http://localhost:3000/usuario/${userId}`, {
        morador: responseMorador.data,
      }, {
        headers: { "Content-Type": "application/json" }
      });
      console.log("Morador - response: ", responseMorador.data);
      console.log("Usuario - response: ", responseUsuario.data);
      
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao cadastrar morador:", error);
      alert("Erro ao completar perfil. Tente novamente.");
    }
  };

  return (  
    <div id="main-container" style={{height: "80%"}}>
      <h1>Complete Your Profile</h1>
      <div id="input-container">
        <InputText className="menu-item" id="apelido" placeholder="Apelido" onChange={(e) => setApelido(e.target.value)}/>
        <InputText className="menu-item" id="cargo" placeholder="Cargo" onChange={(e) => setCargo(e.target.value)}/>
        <InputText className="menu-item" id="periodo" placeholder="Periodo" onChange={(e) => setPeriodo(e.target.value)}/>
        <InputText className="menu-item" id="curso" placeholder="Curso" onChange={(e) => setCurso(e.target.value)}/>
        <InputText className="menu-item" id="turnoCurso" placeholder="Turno do curso" onChange={(e) => setTurnoCurso(e.target.value)}/>
        <InputText className="menu-item" id="cidadeDeOrigem" placeholder="Cidade de origem" onChange={(e) => setCidadeDeOrigem(e.target.value)}/>
        <Button className="menu-item" id="submit" label="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CadastroMorador;
