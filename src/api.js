import axios from "axios";

const API_URL = "http://31.34.150.223:1337/api"; // Remplace par l'URL de ton API Strapi

export const registerUser = async (email, password, username) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error", error);
    return { error: error.response.data };
  }
};

export const loginUser = async (identifier, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local`, {
      identifier,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    return { error: error.response.data };
  }
};

// Nouvelle fonction pour vérifier la validité du JWT
export const checkJwtValidity = async (jwt) => {
  console.log("jwt", jwt)
  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data; // Renvoie les données utilisateur si le JWT est valide
  } catch (error) {
    console.error("JWT validity check error", error);
    return { error: error.response ? error.response.data : "Network error" }; // Gestion des erreurs
  }
};

export const createEsplighter = async (UID, jwt) => {
  try {
    const response = await axios.post(`${API_URL}/esplighters`, {
      UID,
    }, {
      headers: {
        Authorization: `Bearer ${jwt}`, // Inclure le JWT pour l'authentification
      },
    });
    return response.data; // Renvoie le nouvel esplighter créé
  } catch (error) {
    console.error("Create esplighter error", error);
    return { error: error.response.data }; // Gestion des erreurs
  }
};

// Nouvelle fonction pour vérifier la validité du JWT
export const getEsplighter = async (jwt) => {
  console.log("jwt", jwt)
  try {
    const response = await axios.get(`${API_URL}/esplighters`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("caca", response.data);
    return response.data; // Renvoie les données utilisateur si le JWT est valide
  } catch (error) {
    console.error("JWT validity check error", error);
    return { error: error.response ? error.response.data : "Network error" }; // Gestion des erreurs
  }
};

export const updateEsplighterDetails = async (jwt, esplighterId, details) => {
  console.log("JWT:", jwt);
  console.log("Esplighter ID:", esplighterId);
  console.log("Détails à mettre à jour:", details);

  console.log("les truc",       {
    id: esplighterId, // ID de l'Esplighter à mettre à jour
    ...details // Détails à mettre à jour (Nom, lightMax, LightMin)
  }, 
  {
    headers: {
      Authorization: `Bearer ${jwt}`, // Inclut le JWT dans les en-têtes
    },
  })
  
  try {
    const response = await axios.put(`${API_URL}/esplighters/details`, 
      {
        id: esplighterId, // ID de l'Esplighter à mettre à jour
        ...details // Détails à mettre à jour (Nom, lightMax, LightMin)
      }, 
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // Inclut le JWT dans les en-têtes
        },
      }
    );
    console.log("Détails mis à jour:", response.data);
    return response.data; // Renvoie les données mises à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour des détails:", error);
    return { error: error.response ? error.response.data : "Network error" }; // Gestion des erreurs
  }
};