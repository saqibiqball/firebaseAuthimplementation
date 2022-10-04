import "./App.css";
import Home from "./components/Home";
import LoginForm from "./form/loginForm";
import RegisterForm from "./form/registerForm";
import { Route, Routes } from "react-router-dom";
import { auth } from "./firebaseConfig";
import Dashboard from "./components/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import background from "./Assets/bg.jpg";
import Navbar from "./components/Appbar";
function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
