import { useState } from "react";
import { loginUser } from "./api";
import "./App.css";

function Login({setIsRegister, setIsAuthenticated}) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await loginUser(identifier, password);
    if (data.error) {
      setMessage(data.error.message);
    } else {
      setMessage("Login successful!");
      localStorage.setItem("jwtEsp32ailEauThe",data.jwt)
      setIsAuthenticated(true)
      window.location.reload()
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Vous n'avez pas de compte? <strong style={{cursor: 'pointer'}} onClick={() => setIsRegister(true)}>Créez un compte!</strong></p>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
