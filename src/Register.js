import { useState } from "react";
import { registerUser } from "./api";
import "./App.css";

function Register({setIsRegister}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = await registerUser(email, password, username);
    if (data.error) {
      setMessage(data.error.message);
    } else {
      setMessage("Registration successful! You can now log in.");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>Vous avez un compte? <strong style={{cursor: 'pointer'}} onClick={() => setIsRegister(false)}>Connectez-vous !</strong></p>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
