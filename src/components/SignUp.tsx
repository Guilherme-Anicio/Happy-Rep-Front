import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "../styles/SignUp.css";
import axios from 'axios';
import { useState } from "react";

function SignUp() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    
    const usuarioData = {
      nome: firstName,
      sobrenome: lastName,
      email: email,
      senha: password,
      telefone: phoneNumber
    };
    
    try {
      const response = await axios.post("http://localhost:3000/usuario", usuarioData, {
        headers: { "Content-Type": "application/json" }
      });
      console.log(response.data);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (  
    <div id="main-container">
      <h1>Sign Up</h1>
      <div id="input-container">
        <div id="name-input">
            <InputText id="first-name" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
            <InputText id="last-name" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <InputText className="menu-item" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <InputText className="menu-item" id="phone-number" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}/>
        <Password id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <Password id="confirm-password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
        <Button className="menu-item" id="submit" label="Submit" onClick={handleSubmit} />
        <div id="login-link">
            <span>Already have an account? </span>
            <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
