/*
import { useState } from 'react';
import { createEsplighter } from './api';

function AddEsplighter() {
  const [UID, setUID] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jwt = localStorage.getItem("jwtEsp32ailEauThe"); // Assurez-vous d'avoir le JWT

    try {
      const response = await createEsplighter(UID, jwt); // Utilise la nouvelle fonction API
      if (response.error) {
        setMessage(`Erreur lors de l'ajout : ${response.error.message}`);
      } else {
        setMessage(`Esplighter ajouté avec succès : ${response.id}`);
        setUID(''); // Réinitialise le champ UID
      }
    } catch (error) {
      setMessage(`Erreur lors de l'ajout : ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="UID"
        value={UID}
        onChange={(e) => setUID(e.target.value)}
        required
      />
      <button type="submit">Ajouter Esplighter</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default AddEsplighter;
*/