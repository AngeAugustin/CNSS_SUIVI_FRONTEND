import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckingNPI = () => {
  const navigate = useNavigate();
  const [NPI, setNPI] = useState('');
  const [error, setError] = useState('');
  const [resultChecking, setResultChecking] = useState(null);

  const handleCheckingNPI = async (e) => {
    e.preventDefault();
    if (NPI.trim() === '') {
      setError('Veuillez entrer votre NPI');
      return;
    }
    fetch(`https://localhost:8000/checkingNPI/${NPI}?NPI=${NPI}`)
      .then((res) => res.json())
      .then((data) => {
        setResultChecking(data);
      })
      .catch((err) => console.log(err));
  };

  const handleNPIChange = (e) => {
    setNPI(e.target.value);
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
    justifyContent: 'center',
  };

  const inputStyle = {
    margin: '10px',
    padding: '10px',
    width: '400px',
    textAlign: 'left',
    border: 'none',
    borderRadius: '5px',
    height: '30px',
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

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: '40px',
    borderRadius: '8px',
    margin: 'auto',
    height: '300px',
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

  const messageStyle = {
    marginBottom: '10px',
    textAlign: 'center',
    fontSize: '15px',
    color: 'blue',
    cursor: 'pointer',
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

      <div style={{ height: '80px' }}></div>

      <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img src="https://www.hdfclife.com/content/dam/hdfclifeinsurancecompany/category-page/retirement-plan/images/Retirement_Pension_Plan_Scheme.png" alt="Caisse Nationale de Sécurité Sociale" style={{ width: '100%', height: '630px' }} />
      </div>
      <div style={{width:'100px'}}></div>
      <div style={formContainerStyle}>
      <img src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png" alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <div style={{height:'20px'}}></div>
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        <div style={inputContainerStyle}>
          <input
            type="text"
            placeholder="NPI"
            style={inputStyle}
            value={NPI}
            onChange={handleNPIChange}
          />
        </div>
        <button style={buttonStyle} onClick={handleCheckingNPI}>
          Vérification
        </button>

        <div style={{ height: '20px' }}></div>

        {resultChecking && (
  <div>
    {resultChecking.message && (
      <div style={messageStyle}>
        {resultChecking.message !== 'Vous n\'êtes pas éligible à ce service' && (
          <span style={{ color: 'black' }}>
            {resultChecking.message === 'Veuillez vous connecter' ? 'Vous avez déjà un compte.' : 'Vous n\'avez pas de compte.'}
          </span>
        )}
        <span style={{ color: 'blue', cursor: 'pointer', marginLeft: resultChecking.message !== 'Vous n\'êtes pas éligible à ce service' ? '5px' : '0' }} onClick={() => {
          if (resultChecking.message === 'Veuillez vous connecter') {
            navigate(`/connexion?NPI=${NPI}`);
          } else if (resultChecking.message === 'Veuillez vous inscrire') {
            navigate(`/inscription?NPI=${NPI}`);
          }
        }}>
          {resultChecking.message}
        </span>
      </div>
    )}
  </div>
)}
      </div>
    </div>
    </div>
  );
};

export default CheckingNPI;
