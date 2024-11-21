import { motion } from 'framer-motion';
import { useState } from 'react'; // Import useState pour gérer l'état local
import { getColorFromValue } from './tools';
import { updateEsplighterDetails } from './api'; // Assure-toi que le chemin est correct

export default function EsplighterInfo({ nom, light, lightMax, lightMin, jwt, esplighterId }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler la popup
  const [newNom, setNewNom] = useState(nom);
  const [newLightMax, setNewLightMax] = useState(lightMax);
  const [newLightMin, setNewLightMin] = useState(lightMin);

  const lightPercentage = (light / lightMax) * 100;

  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      width: '300px',
      margin: '0 auto',
    },
    barContainer: {
      width: '100%',
      height: '20px',
      backgroundColor: '#e0e0e0',
      borderRadius: '10px',
      overflow: 'hidden',
      marginBottom: '10px',
    },
    bar: {
      height: '100%',
      backgroundColor: '#4caf50',
      borderRadius: '10px',
    },
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: isModalOpen ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      width: '300px',
      textAlign: 'center',
    },
  };

  const handleSave = async () => {
    // Logique pour sauvegarder les nouvelles valeurs
    const result = await updateEsplighterDetails(jwt, esplighterId, {
      Nom: newNom,
      lightMax: newLightMax,
      LightMin: newLightMin,
    });

    if (result.error) {
      console.error("Erreur lors de la mise à jour:", result.error);
    } else {
      console.log("Détails mis à jour avec succès:", result);
    }
    
    setIsModalOpen(false); // Ferme la popup après sauvegarde
  };

  return (
    <div style={styles.container}>
      <h2>{nom}</h2>

      <p><strong>Light Info:</strong> {light}</p>
      <div style={styles.barContainer}>
        <motion.div
          style={styles.bar}
          initial={{ width: `${lightPercentage}%` }}
          animate={{ width: `${lightPercentage}%`, backgroundColor: getColorFromValue(lightPercentage) }}
          transition={{ duration: 1 }}
        />
      </div>

      <p><strong>Light Max:</strong> {lightMax}</p>
      <p><strong>Light Min:</strong> {lightMin}</p>

      {/* Bouton pour ouvrir la popup */}
      <button onClick={() => setIsModalOpen(true)}>Modifier</button>

      {/* Popup pour modifier les informations */}
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <h3>Modifier les informations</h3>
          <label>
            Nom :
            <input type="text" value={newNom} onChange={(e) => setNewNom(e.target.value)} />
          </label>
          <br />
          <label>
            Light Max :
            <input type="number" value={newLightMax} onChange={(e) => setNewLightMax(Number(e.target.value))} />
          </label>
          <br />
          <label>
            Light Min :
            <input type="number" value={newLightMin} onChange={(e) => setNewLightMin(Number(e.target.value))} />
          </label>
          <br />
          <button onClick={handleSave}>Sauvegarder</button>
          <button onClick={() => setIsModalOpen(false)}>Annuler</button>
        </div>
      </div>
    </div>
  );
}
