import React, { useState, useEffect } from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const Consultation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'https://localhost:8000/search';
        
        // Si aucun critère n'est spécifié, envoyer une requête sans paramètres de recherche
        if (searchCriteria !== '' && searchQuery !== '') {
          url += `?${searchCriteria}=${searchQuery}`;
        }

        const response = await fetch(url); 

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error('Erreur lors de la récupération des données.');
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        setSearchResults([]);
      }
    };

    fetchData();
  }, [searchQuery, searchCriteria]); 

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const handleLogout = () => {
    navigate('/login'); 
  };

  const handleUserIconClick = () => {
    setUserMenuOpen(!userMenuOpen); 
  };

  const niveauTextMap = {
    1: 'Guichet',
    2: 'Chef Unité Etude et Prestations faimiliales',
    3: 'Unité Etude et Prestations faimiliales',
    4: 'Chef Unité Etude',
    5: 'Unité Etude',
    6: 'Chef Service Carrière',
    7: 'Service Carrière',
    8: 'Chef Unité Décompte',
    9: 'Unité Décompte',
    10: 'Chef Section Prestations',
    11: 'Chef Service Prestations',
    12: 'Directeur des Prestations', 
    13: 'Chef Section Traitement des Pensions et Rentes'
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
    position: 'fixed', // Position fixe
    top: '0', // Aligner en haut de la page
    width: '100%', // Occuper toute la largeur
    zIndex: '999', // Assurer que l'en-tête est au-dessus de tout le reste
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  };

  const tableContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '20px',
    width: '95%',
    borderRadius: '8px',
  };

  const thTdStyle = {
    border: 'none',
    padding: '10px',
    textAlign: 'start',
    backgroundColor: '#fff',
  };

  const thTitleStyle = {
    border: 'none',
    padding: '10px',
    textAlign: 'start',
    backgroundColor: '#fff',
    color:'grey'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: 'none',
    borderSpacing: '0',
  };

  const trStyle = {
    borderBottom: '1px solid #ccc', // Ajout d'une bordure inférieure grise
  };

  const pageStyle = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    justifyContent: 'start',
  };

  const handleDetailsClick = (result) => {
    navigate(`/DetailsConsultation?reference=${result.Reference_dossier}`);
  };

  return (
    <div style={pageStyle}>
      
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
            <div>{` ${niveauTextMap[useAuth().Id_niveau]} - ${agenceTextMap[useAuth().Id_agence]} `}</div>
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
      

      <div style={{ height: '80px' }}></div>

      <div style={tableContainerStyle}>
        <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'left', fontSize: '25px', fontFamily: 'Century Gothic' }}>Rechercher un dossier</div>
      </div>
      
      <div style={{height:'10px'}}></div>
      
      <div style={{ backgroundColor: '', height:'70px', width:'1250px', justifyContent:'center', display: 'flex', flexDirection: 'column', alignItems: 'center', border: ''}}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <select value={searchCriteria} onChange={handleCriteriaChange} style={{ marginRight: '10px', padding: '15px', width: '200px', borderRadius: '5px' }}>
            <option value="">Tous</option>
            <option value="Nom_pensionne">Nom du pensionné</option>
            <option value="Prénom_pensionne">Prénoms du pensionné</option>
            <option value="Numero_pensionne">Numéro du pensionné</option>
            <option value="Reference_dossier">Référence du dossier</option>
            <option value="NPI">NPI</option>
            <option value="Id_agence">Code Agence</option>
          </select>
          <div style={{width:'10px'}}></div>
          <input
            type="text"
            placeholder="Rechercher"
            value={searchQuery}
            onChange={handleSearchInputChange}
            style={{ padding: '15px', width: '300px', borderRadius: '5px', borderColor:'grey'}}
          />
        </div>
      </div>

      <div style={{ backgroundColor: '#f0f0f0', borderRadius: '15px', overflow:'auto', marginTop: '20px', width: '80%' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTitleStyle}>Agence de provenance</th>
              <th style={thTitleStyle}>Nom du pensionné</th>
              <th style={thTitleStyle}>Numéro du pensionné</th>
              <th style={thTitleStyle}>Prénoms du pensionné</th>
              <th style={thTitleStyle}>Référence du dossier</th>
              <th style={thTitleStyle}>NPI</th>
              <th style={thTitleStyle}>Statut global</th>
              <th style={thTitleStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index} style={trStyle}>
                <td style={thTdStyle}>{agenceTextMap[result.ID_agence]}</td>
                <td style={thTdStyle}>{result.Nom_pensionne}</td>
                <td style={thTdStyle}>{result.Numero_pensionne}</td>
                <td style={thTdStyle}>{result.Prenom_pensionne}</td>
                <td style={thTdStyle}>{result.Reference_dossier}</td>
                <td style={thTdStyle}>{result.NPI}</td>
                <td style={thTdStyle}>{result.Statut_global_dossier}</td>
                <td style={thTdStyle}><button style={{ backgroundColor: '#1412b2', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }} onClick={() => handleDetailsClick(result)}>Voir les détails</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Consultation;
