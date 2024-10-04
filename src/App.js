import { useEffect, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { checkJwtValidity, getEsplighter } from "./api"; // Importer la nouvelle fonction
import NavBar from './navBar'
import EsplighterInfo from './EsplighterInfo'

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Pour afficher un loader pendant la vérification
  const [jwtYe, setjwtYe] = useState(""); // Pour afficher un loader pendant la vérification
  const [esplighterData, setEsplighterData] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwtEsp32ailEauThe"); // Récupère le JWT

    const fetchData = async () => {
      const result = await getEsplighter(jwt);
      if (result.error) {
      } else {
        setEsplighterData(result); // Définit les données reçues
        console.log("Données récupérées :", result);
      }
    };

    // Définir l'intervalle pour exécuter fetchData toutes les secondes
    if (jwtYe !== "") {
      const interval = setInterval(() => {
        fetchData();
        console.log("jwtYe", jwtYe);
      }, 1000); // 1000 ms = 1 seconde

      // Nettoyer l'intervalle lorsque le composant est démonté
      return () => clearInterval(interval);
    }
  }, [jwtYe]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwtEsp32ailEauThe");
    setjwtYe(jwt);
    if (jwt) {
      // Vérifie la validité du JWT
      checkJwtValidity(jwt)
        .then((data) => {
          if (data.error) {
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        })
        .catch(() => setIsAuthenticated(false)) // Gérer les erreurs réseau
        .finally(() => setLoading(false)); // Fin du chargement
    } else {
      setLoading(false); // Aucun JWT, fin du chargement
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Affiche un texte de chargement ou un spinner
  }

  return (
    <div>
      {jwtYe === "" &&
        <h1>Loading...</h1>
      }
      {esplighterData &&
        <div style={{ position: 'fixed', top: '100px', left: '0px', width: '100%' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {esplighterData.map((esplighter) => (
                <EsplighterInfo jwt={jwtYe} esplighterId={`${esplighter.id}`} lightMin={esplighter.LightMin} lightMax={esplighter.lightMax} light={esplighter.lightinfo} nom={esplighter.Nom} key={esplighter.id} />
              ))}
            </div>
          </div>
        </div>
      }
      {isAuthenticated ? (
        <div />
        //<Dashboard /> // Si JWT valide, afficher la page principale
      ) : (
        <div>
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Go to Login" : "Go to Register"}
          </button>
          {isRegister ? (
            <Register setIsRegister={setIsRegister} />
          ) : (
            <Login setIsRegister={setIsRegister} setIsAuthenticated={setIsAuthenticated} />
          )}
        </div>
      )}
      <NavBar />
    </div>
  );
}

export default App;
