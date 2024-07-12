import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Inscription = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [npi, setNpi] = useState('');
  const [Ppassword, setPpassword] = useState('');
  const [confirmPpassword, setConfirmPpassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); 

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const npiParam = searchParams.get('NPI');
    if (npiParam) {
      setNpi(npiParam);
    }
  }, [location.search]);

  const handleNpiChange = (e) => {
    setNpi(e.target.value.replace(/\D/, '').slice(0, 10));
  };

  const handleConfirmPpasswordChange = (e) => {
    setConfirmPpassword(e.target.value);
  };

  const handleInscription = async () => {
    if (!npi || !Ppassword || !confirmPpassword) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setSuccessMessage('');
    } else if (Ppassword !== confirmPpassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      setSuccessMessage('');
    } else {
      try {
        setIsLoading(true);
        const myInscription = {
          NPI: npi,
          Ppassword: Ppassword
        };
        const options = {
          method: 'POST',
          body: JSON.stringify(myInscription),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(`https://localhost:8000/inscription`, options);

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setIsSuccess(true); // Mettre à jour l'état pour indiquer le succès de l'inscription

          setTimeout(() => navigate('/Connexion'), 5000); // Redirection après 5 secondes
        } else {
          throw new Error('Une erreur s\'est produite');
        }
      } catch (error) {
        console.log(error.message);
        setErrorMessage('Erreur lors de l\'inscription.');
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

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
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

  const inputStyle = {
    margin: '10px',
    padding: '10px',
    width: '400px', // Utilisez toute la largeur disponible
    textAlign: 'left',
    border:'none',
    borderRadius:'5px',
    height:'50px'
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

  const errorStyle = {
    color: 'red',
    margin: '10px 0',
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

  const successStyle = {
    color: '#1412b2',
    margin: '10px 0',
    fontSize:'17px',
    fontWeight:'bold'
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <header style={{ width: '100%', backgroundColor: '#1214b2', color: '#fff', padding: '0px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://play-lh.googleusercontent.com/TZVxPxjrpyVaJXUHZBxOc0Lz8AGNHST3nMEN3tXO-MO9EUtJRxQYe9uK_0bXYk1RQviG" alt="Caisse Nationale de Sécurité Sociale" style={{ marginRight: '10px', width: '70px', height: 'auto' }} />
            <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>CAISSE NATIONALE DE SECURITE SOCIALE</div>
          </div>
        </header>
      </div>

      {/* Spacer */}
      <div style={{height:'80px'}}></div>
 
      {/* Container */}
      <div style={containerStyle}>
        <div style={imageContainerStyle}>
          <img src="https://www.hdfclife.com/content/dam/hdfclifeinsurancecompany/category-page/retirement-plan/images/Retirement_Pension_Plan_Scheme.png" alt="Pensions" style={{ width: '100%', height: '630px' }} />
        </div>
        <div style={{width:'100px'}}></div>
        <div style={formContainerStyle}>
          {isSuccess ? (
            <>
              <img src="https://static.vecteezy.com/system/resources/previews/024/132/259/non_2x/3d-male-character-happy-jumping-free-png.png" alt="Success" style={{ width: '300px', height: '300px', borderRadius: '20%' }} />
              <div style={{ height: '20px' }}></div>
              <p style={successStyle}>Youpii, Compte créé avec succès.</p>
            </>
          ) : (
            <>
              <img src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png" alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
              <div style={{height:'20px'}}></div>
              {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
              {successMessage && <p style={successStyle}>{successMessage}</p>}
              <input
                type="text"
                placeholder="NPI"
                style={inputStyle}
                value={npi}
                onChange={handleNpiChange}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                style={inputStyle}
                value={Ppassword}
                onChange={(e) => setPpassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                style={inputStyle}
                value={confirmPpassword}
                onChange={handleConfirmPpasswordChange} // Gestionnaire de changement pour le champ de confirmation de mot de passe
              />
              <button style={buttonStyle} onClick={handleInscription}>
                {isLoading ? 'S\'inscrire...' : 'S\'inscrire'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inscription;
