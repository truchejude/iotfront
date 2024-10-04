import AddEsplighter from "./AddEsplighter";

function Dashboard() {
    const handleLogout = () => {
      localStorage.removeItem("jwtEsp32ailEauThe");
      window.location.reload(); // Rafraîchir la page pour réinitialiser l'état
    };
  
    return (
      <div>
        <h1>Welcome to the Dashboard!</h1>
        <AddEsplighter />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
  
  export default Dashboard;
  