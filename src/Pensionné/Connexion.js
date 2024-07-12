import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Connexion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [NPI, setNPI] = useState('');
  const [Ppassword, setPpassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const npiParam = searchParams.get('NPI');
    if (npiParam) {
      setNPI(npiParam);
    }
  }, [location.search]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!NPI) {
      setErrorMessage('Veuillez entrer votre NPI.');
      setSuccessMessage('');
      setIsLoading(false);
    } else {
      try {
        const myConnexion = {
          NPI: NPI,
          Ppassword: Ppassword
        };

        const options = {
          method: 'POST',
          body: JSON.stringify(myConnexion),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch('https://localhost:8000/connexion', options);

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setNPI(responseData.NPI);
          localStorage.setItem('NPI', responseData.NPI);
          navigate('/Accueil');
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

  const pageStyle = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    justifyContent: 'start',
  };

  const inputContainerStyle = {
    display: 'flex',
    justifyContent: 'center', // Centrer horizontalement
  };

  const inputStyle = {
    margin: '10px',
    padding: '10px',
    width: '400px', // Utilisez toute la largeur disponible
    textAlign: 'left',
    border:'none',
    borderRadius:'5px',
    height:'30px'
  };

  const buttonStyle = {
    margin: '10px',
    padding: '15px 30px',
    background: '#1412b2',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '420px',
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  const messageStyle = {
    color: successMessage ? 'green' : 'red',
    margin: '10px 0',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    height: '95vh',
    maxWidth: '1200px', // Ajouter une largeur maximale au conteneur parent
    margin: 'auto', // Centrer horizontalement
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
    height: '350px'
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

  const handleInscription = () => {
    navigate('/CheckingNPI');
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
        <img src="https://www.hdfclife.com/content/dam/hdfclifeinsurancecompany/category-page/retirement-plan/images/Retirement_Pension_Plan_Scheme.png" alt="Caisse Nationale de Sécurité Sociale" style={{ width: '100%', height: '630px' }} />
      </div>
      <div style={{width:'100px'}}></div>
      <div style={formContainerStyle}> 
      <img src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png" alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <div style={{height:'20px'}}></div>
        <style>{keyframes}</style>
        {errorMessage && <p style={messageStyle}>{errorMessage}</p>}
        {successMessage && <p style={messageStyle}>{successMessage}</p>}
        <div style={inputContainerStyle}> 
          <input
            type="text"
            placeholder="NPI"
            style={inputStyle}
            value={NPI}
            onChange={(e) => setNPI(e.target.value)}
          />
        </div>
        <div style={inputContainerStyle}> 
          <input
            type="text"
            placeholder="Mot de passe"
            style={inputStyle}
            value={Ppassword}
            onChange={(e) => setPpassword(e.target.value)}
          />
        </div>
        <button style={buttonStyle} onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Connexion...' : 'Connexion'}
        </button>
        <p style={{ margin: '10px 0' }}>Vous n'avez pas de compte ? <button style={{ color: 'blue', cursor: 'pointer', border: 'none' }} onClick={handleInscription}>Inscrivez-vous</button></p>
      </div>
      </div>

    </div>
  );
};

export default Connexion;
