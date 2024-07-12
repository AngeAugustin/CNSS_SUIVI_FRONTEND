import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Modification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reference = new URLSearchParams(location.search).get("Reference_dossier");


  const [numeroPensionne, setNumeroPensionne] = useState('');
  const [numeroAssure, setNumeroAssure] = useState('');
  const [nomPensionne, setNomPensionne] = useState('');
  const [prenomPensionne, setPrenomPensionne] = useState('');
  const [telephonePensionne, setTelephonePensionne] = useState('');
  const [adressePensionne, setAdressePensionne] = useState('');
  const [npi, setNpi] = useState('');
  const [typeDossier, setTypeDossier] = useState('Pension Titulaire');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { Id_acteur } = useAuth();
  const { Id_agence } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [referenceDossier, setReferenceDossier] = useState('');

  useEffect(() => {
    if (reference) {
      fetch(`https://localhost:8000/detailsmodifier/${reference}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Données récupérées :", data);
  
          // Assurez-vous que les données ont été récupérées avec succès
          if (Array.isArray(data) && data.length > 0) {
            const firstItem = data[0]; // Prenez le premier élément du tableau
            // Mettez à jour les états avec les données récupérées
            setNumeroPensionne(String(firstItem.Numero_pensionne) || ''); 
            setNomPensionne(firstItem.Nom_pensionne || '');
            setPrenomPensionne(firstItem.Prenom_pensionne || '');
            setTelephonePensionne(String(firstItem.Telephone_pensionne) || '');
            setAdressePensionne(firstItem.Adresse_pensionne || '');
            setNpi(String(firstItem.NPI )|| '');
            setTypeDossier(firstItem.Type_dossier || '');
            setNumeroAssure(firstItem.Numero_assure || '');
          } else {
            // Gérez le cas où aucune donnée n'a été trouvée
            console.log("Aucune donnée trouvée");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [reference]);

  const niveauTextMap = {
    1: 'Guichet',
    2: 'Chef Unité Etude et Prestations familiales',
    3: 'Unité Etude et Prestations familiales',
    4: 'Chef Unité Etude',
    5: 'Unité Etude',
    6: 'Chef Service Carrière',
    7: 'Service Carrière',
    8: 'Chef Unité Décompte',
    9: 'Unité Décompte',
    10: 'Chef Section Prestations',
    11: 'Chef Service Prestations',
    12: 'Directeur des Prestations', 
    13: 'Chef Section Traitement des Pensions et Rentes',
    14: 'Bureau Relation Client'
  };

  const agenceTextMap = {
    1: 'Direction Générale',
    2: 'Cotonou',
    3: 'Porto Novo',
    4: 'Lokossa',
    5: 'Abomey',
    6: 'Parakou',
    7: 'Natitingou',
  };

  const headerStyle = {
    backgroundColor: '#1412b2',
    color: '#fff',
    padding: '10px',
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: '999',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleUserIconClick = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleModification = async () => {
    if (!numeroPensionne || !nomPensionne || !prenomPensionne || !telephonePensionne || !adressePensionne || !npi || !typeDossier) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setSuccessMessage('');
    } else {
      try {

        const myModification = {
          Nom_pensionne: nomPensionne,
          Prenom_pensionne: prenomPensionne,
          Telephone_pensionne: telephonePensionne,
          Adresse_pensionne: adressePensionne,
          NPI: npi,
          Numero_pensionne: numeroPensionne,
          Type_dossier: typeDossier,
          Numero_assure: numeroAssure
        };

        const options = {
          method: 'POST',
          body: JSON.stringify(myModification),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const response = await fetch(`https://localhost:8000/modifier/${reference}`, options);

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          navigate('/Dashboard');
        } else {
          throw new Error('Une erreur s\'est produite');
        }
      } catch (error) {
        console.log(error.message);
        setErrorMessage('Erreur lors de la modification.');
        setSuccessMessage('');
      }
    }
  };

  const pageStyle = {
    backgroundColor: '#fff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
  };

  const formContainerStyle = {
    backgroundColor: '#f0f0f0',
    padding: '50px',
    borderRadius: '15px',
    width: '700px',
    textAlign: 'center',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '350px',
  };


  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  const inputStyle = {
    backgroundColor: '#fff',
    padding: '13px',
    marginBottom: '10px',
    borderRadius: '10px',
    width: '95%',
    height: '20px',
    border: 'none'
  };

  const errorStyle = {
    color: 'red',
    margin: '10px 0',
  };

  const successStyle = {
    color: 'green',
    margin: '10px 0',
  };

  const tableContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '20px',
    width: '48%',
    borderRadius: '8px',
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <header style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/Dashboard">
              <img src="https://play-lh.googleusercontent.com/TZVxPxjrpyVaJXUHZBxOc0Lz8AGNHST3nMEN3tXO-MO9EUtJRxQYe9uK_0bXYk1RQviG" alt="Caisse Nationale de Sécurité Sociale" style={{ marginRight: '10px', width: '70px', height: 'auto' }} />
            </Link>
            <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>CAISSE NATIONALE DE SECURITE SOCIALE</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaUser style={{ marginRight: '10px', cursor: 'pointer' }} onClick={handleUserIconClick} />
            <div>
              <div>{` ${niveauTextMap[useAuth().Id_niveau]} - ${agenceTextMap[useAuth().Id_agence]}`}</div>
            </div>
          </div>

          {userMenuOpen && (
            <div style={{ position: 'absolute', top: '80px', right: '10px', backgroundColor: 'grey', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div onClick={handleLogout} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <FaSignOutAlt style={{ marginRight: '5px' }} />
                <span>Déconnexion</span>
              </div>
            </div>
          )}
        </header>
      </div>

      <div style={{height:'100px'}}></div>
      
      <div style={tableContainerStyle}>
      <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'center', fontSize: '25px', fontFamily: 'Arial' }}>Modifier un dossier</div>
      </div>

      <div style={{height:'10px'}}></div>

      <div style={formContainerStyle}>
        <img src="https://static.vecteezy.com/system/resources/previews/022/359/321/non_2x/3d-folder-file-icon-illustration-png.png" alt="Avatar" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
        <div style={{ height: '50px' }}></div>
        <style>{keyframes}</style>
        <div style={{ height: '10px' }}></div>
        {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        {successMessage && <p style={successStyle}>{successMessage}</p>}

        {/* Boutons radio pour sélectionner le type de dossier */}
        <div style={{ fontSize: '17px' }}>
          <label>
            <input
              type="radio"
              value="Pension titulaire"
              checked={typeDossier === 'Titulaire'}
              onChange={(e) => setTypeDossier(e.target.value)}
            />
            Pension titulaire
          </label>
          <label>
            <input
              type="radio"
              value="Pension de survivant veuve"
              checked={typeDossier === 'Pension de survivant veuve'}
              onChange={(e) => setTypeDossier(e.target.value)}
            />
            Pension de survivant veuve
          </label>
          <label>
            <input
              type="radio"
              value="Pension de survivant orphelin"
              checked={typeDossier === 'Pension de survivant orphelin'}
              onChange={(e) => setTypeDossier(e.target.value)}
            />
            Pension de survivant orphelin
          </label>
        </div>

        <div style={{ height: '100px' }}></div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>

        {/* Afficher le type de dossier sélectionné */}
        <div style={{ width: '48%' }}>
          <input
            type="text"
            placeholder="Type dossier"
            style={inputStyle}
            value={typeDossier}
            readOnly
          />
        </div>

          <div style={{ width: '48%' }}>
            <input
              type="text"
              placeholder="NPI"
              style={inputStyle}
              value={npi}
              onChange={(e) => setNpi(e.target.value)}
              id="npi"
            />
          </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ width: '48%' }}>
            <input
              type="text"
              placeholder="Numéro d'assuré"
              style={inputStyle}
              value={numeroAssure}
              onChange={(e) => setNumeroAssure(e.target.value)}
              id="numeroAssure"
            />
          </div>
          <div style={{ width: '48%' }}>
            <input
              type="text"
              placeholder="Numéro de pensionné"
              style={inputStyle}
              value={numeroPensionne}
              onChange={(e) => setNumeroPensionne(e.target.value)}
              id="numeroPensionne"
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ width: '48%' }}>
            <input
              type="text"
              placeholder="Nom du pensionné"
              style={inputStyle}
              value={nomPensionne}
              onChange={(e) => setNomPensionne(e.target.value)}
              id="nomPensionne"
            />
          </div>
          <div style={{ width: '48%' }}>
            <input
              type="text"
              placeholder="Prénoms du pensionné"
              style={inputStyle}
              value={prenomPensionne}
              onChange={(e) => setPrenomPensionne(e.target.value)}
              id="prenomPensionne"
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ width: '48%' }}>
            <input
              type="text"
              placeholder="Téléphone du pensionné"
              style={inputStyle}
              value={telephonePensionne}
              onChange={(e) => setTelephonePensionne(e.target.value)}
              id="telephonePensionne"
            />
          </div>
          <div style={{ width: '48%' }}>
            <input
              type="text"
              placeholder="Adresse du pensionné"
              style={inputStyle}
              value={adressePensionne}
              onChange={(e) => setAdressePensionne(e.target.value)}
              id="adressePensionne"
            />
          </div>
        </div>
      </div>

      <button
        style={{
          backgroundColor: '#1412b2',
          color: 'white',
          fontWeight: 'bold',
          padding: '17px',
          width: '800px',
          borderRadius: '10px',
          borderColor: 'white',
          cursor: 'pointer',
          marginRight: '0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleModification}>
        <span style={{ marginRight: '20px', }}>
          <img src="https://img.freepik.com/psd-premium/3d-adicionar-nova-ilustracao-de-icone-de-pasta-de-arquivo_148391-974.jpg?size=626&ext=jpg" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </span>
        Enregistrer la modification
      </button>
    </div>
  );
};

export default Modification;
