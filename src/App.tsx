import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import MainPage from "./components/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CadastroMorador from "./components/CadastroMorador";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/mainpage"
          element={<ProtectedRoute element={MainPage} />}
        />
        <Route
          path="/cadastro-morador"
          element={<ProtectedRoute element={CadastroMorador} />}
        />
      </Routes>
    </Router>
  );
}

export default App;