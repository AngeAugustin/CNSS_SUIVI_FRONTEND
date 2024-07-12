import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { setId_niveau } = useAuth();
  const { setId_acteur } = useAuth();
  const { setId_agence } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!Username || !Password) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setSuccessMessage('');
      setIsLoading(false);
    } else {
      try {
        const myLogin = {
          Username: Username,
          Password: Password,
        };

        const options = {
          method: 'POST',
          body: JSON.stringify(myLogin),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch('https://localhost:8000/connexion', options);

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setId_niveau(responseData.Id_niveau);
          setId_acteur(responseData.Id_acteur);
          setId_niveau(responseData.Id_niveau);
          setId_agence(responseData.Id_agence);
          setUsername(responseData.Username);

          // Storing Id_niveau and Username in local storage
          localStorage.setItem('Id_niveau', responseData.Id_niveau);
          localStorage.setItem('Username', responseData.Username);

          navigate('/Dashboard');
        } else {
          throw new Error("Une erreur s'est produite");
        }
      } catch (error) {
        console.log(error.message);
        setErrorMessage('Informations incorrectes');
        setSuccessMessage('');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    maxWidth: '1200px', // Ajouter une largeur maximale au conteneur parent
    margin: 'auto', // Centrer horizontalement
  };
  
  const headerStyle = {
    backgroundColor: '#1412b2',
    color: '#fff',
    padding: '10px',
    position: 'fixed', // Position fixe
    top: '0', // Aligner en haut de la page
    width: '100%', // Occuper toute la largeur
    zIndex: '999', // Assurer que l'en-tête est au-dessus de tout le reste
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  };
  

  const imageContainerStyle = {
    flex: '1', // Prendre 50% de l'espace
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  };

  const formContainerStyle = {
    flex: '1', // Prendre 50% de l'espace
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: '40px',
    borderRadius: '8px',
    margin: 'auto', // Centrer horizontalement
    height: '300px'
  };

  const pageStyle = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    justifyContent: 'start',
  };
  

  return (
  <div style={pageStyle}> 
    <div style={headerStyle}>
      <header style={{ width: '100%', backgroundColor: '#1214b2', color: '#fff', padding: '0px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://play-lh.googleusercontent.com/TZVxPxjrpyVaJXUHZBxOc0Lz8AGNHST3nMEN3tXO-MO9EUtJRxQYe9uK_0bXYk1RQviG" alt="Caisse Nationale de Sécurité Sociale" style={{ marginRight: '10px', width: '70px', height: 'auto' }} />
          <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>CAISSE NATIONALE DE SECURITE SOCIALE</div>
        </div>
      </header>
    </div>

    <div style={{height:'80px'}}></div>
    
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img src="https://www.icone-png.com/png/54/54106.png" alt="Caisse Nationale de Sécurité Sociale" style={{ width: '100%', height: '630px' }} />
      </div>
      <div style={{width:'100px'}}></div>
      <div style={formContainerStyle}>
        <img src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png" alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <input
          type="Username"
          placeholder="Nom d'utilisateur"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ margin: '10px', padding: '20px', width: '100%', borderRadius: '5px', border: 'none'}}
        />
        <input
          type="Password"
          placeholder="Mot de passe"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '10px', padding: '20px', width: '100%', borderRadius: '5px', border: 'none'}}
        />
        <button onClick={handleLogin} disabled={isLoading} style={{ margin: '10px', padding: '20px', width: '109%', background: '#1412b2', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {isLoading ? 'Connexion en cours...' : 'Connexion'}
        </button>
      </div>
    </div>
  </div>
  );
};

export default Login;
