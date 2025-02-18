import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import axios from "axios";
import { useState } from "react";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/usuario/login", {
        email: email,
        senha: password,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      console.log(response.data)
      if(response.data.token){
        
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        window.location.href = "/mainpage";
      }
      
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Credenciais inválidas. Tente novamente.");
    }
  };
  
  return (
    <div id="main-container" style={{height: '50%'}}>
      <h1>Login</h1>
      <div id="input-container">
        <InputText
          className="menu-item"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Password
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="menu-item"
          id="submit"
          label="Login"
          onClick={handleLogin}
        />
        <div id="signup-link">
          <span>Don't have an account? </span>
          <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
