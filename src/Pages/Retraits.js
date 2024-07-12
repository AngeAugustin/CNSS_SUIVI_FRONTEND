import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaUser, FaSignOutAlt} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Retraits = () => {
  const navigate = useNavigate();
  const [dossiers, setDossiers] = useState([]);
  const { Id_niveau } = useAuth();
  const { Id_agence } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  useEffect(() => {
    if (Id_niveau && Id_agence ) {
      fetch(`https://localhost:8000/listAffectation/${Id_niveau}/${Id_agence}`)
        .then((res) => res.json())
        .then((data) => {
          setDossiers(data);
        })
        .catch((err) => console.log(err));
    }
  }, [Id_niveau, Id_agence]);

  const thTdStyle = {
    border: 'none',
    padding: '10px',
    textAlign: 'start',
    backgroundColor: '#fff',
    color:''
  };

  const thTitleStyle = {
    border: 'none',
    padding: '10px',
    textAlign: 'start',
    backgroundColor: '#fff',
    color:'grey'
  };

  const pageStyle = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    justifyContent: 'start',
  };

  const tableContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '20px',
    width: '90%',
    borderRadius: '8px',
  };

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

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: 'none',
    borderSpacing: '0',
  };

  const handleLogout = () => {
    navigate('/login'); 
  };

  const handleUserIconClick = () => {
    setUserMenuOpen(!userMenuOpen); 
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const headerStyle = {
    backgroundColor: '#1412b2',
    color: '#fff',
    padding: '10px',
    position: 'fixed', 
    top: '0', 
    width: '100%', 
    zIndex: '999', 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    
  };

  const trStyle = {
    borderBottom: '1px solid #ccc', 
  };

  const generateTableRows = () => {
    if (!Array.isArray(dossiers)) {
      console.error('Les données de dossiers ne sont pas un tableau :', dossiers);
      return null; 
    }
    
  
    const filteredDossiers = dossiers.filter(dossier => dossier.Statut_global_dossier !== 'Terminé');
  
    return filteredDossiers.map((dossier, index) => (
      <tr key={index} style={trStyle}>
        <td style={thTdStyle}>{dossier.Reference_dossier}</td>
        <td style={thTdStyle}>{`${dossier.Nom_pensionne}  ${dossier.Prenom_pensionne}`}</td>
        <td style={thTdStyle}>{dossier.Statut_affectation}</td>
        <td style={thTdStyle}>{dossier.Statut_traitement}</td>
        <td style={thTdStyle}>{dossier.Id_affecte}</td>
        <td style={thTdStyle}>{formatDate(dossier.Date_affectation)}</td>
      </tr>
    ));
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

      <div style={{height:'70px'}}></div>
      
      <div style={tableContainerStyle}>
      <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'center', fontSize: '25px', fontFamily: 'Century Gothic' }}>Mes retraits</div>
      </div>


      <div style={{height:'25px'}}></div>

      <div style={tableContainerStyle}>
      <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'left',fontFamily: 'Calibri', fontSize: '18px' }}>Retraits récents</div>
      <div style={{height:'15px'}}></div>
        
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTitleStyle}>Référence du dossier</th>
              <th style={thTitleStyle}>Noms et Prénoms</th>
              <th style={thTitleStyle}>Statut affectation</th>
              <th style={thTitleStyle}>Statut traitement</th>
              <th style={thTitleStyle}>Identifiant agent affecté</th>
              <th style={thTitleStyle}>Date affectation</th>
            </tr>
          </thead>
          <tbody>{generateTableRows()}</tbody>
        </table>
      </div>
    </div>

  );
};

export default Retraits;
