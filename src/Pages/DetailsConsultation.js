import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaCheckCircle, FaTimesCircle, FaUser, FaSignOutAlt  } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const DetailsConsultation = () => {
  const location = useLocation();
  const reference = new URLSearchParams(location.search).get('reference');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [parcoursDossiers, setParcoursDossier] = useState([]);
  
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

  useEffect(() => {
    if (reference) {
      fetch(`https://localhost:8000/pensionneDossier/${reference}?reference=${reference}`)
        .then((res) => res.json())
        .then((data) => {
          setParcoursDossier(data); 
        })
        .catch((err) => console.log(err));
    }
  }, [reference]);

  const containerStyle = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const thTitleStyle = {
    border: 'none',
    padding: '10px',
    textAlign: 'start',
    backgroundColor: '#fff',
    color:'grey'
  };

  const centeredTableContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const tableStyle = {
    width: '90%',
    borderCollapse: 'collapse',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    border: 'none',
  };

  const thTdStyle = {
    border: 'none',
    padding: '10px',
    textAlign: 'start',
    backgroundColor: '#fff',
  };
  
  const formatDate = (dateString) => {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
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
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center'
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
    width: '75%',
    borderRadius: '8px',
  };

  

  const trStyle = {
    borderBottom: '1px solid #ccc', // Ajout d'une bordure inférieure grise
  };

  const handleUserIconClick = () => {
    setUserMenuOpen(!userMenuOpen); 
  };

  const handleLogout = () => {
    navigate('/login'); 
  };

  const getLastRowIndex = () => parcoursDossiers.length - 1;
  const lastRow = parcoursDossiers[getLastRowIndex()];

  if (lastRow && lastRow.Id_niveau !== 8) {
    lastRow.Date_traitement = "   ";
  }

  const fieldStyle = {
    backgroundColor: '',
    padding: '4px',
    marginBottom: '10px',
    borderRadius: '5px',
    textAlign: 'left',
    fontWeight: 'bold',
    color:'grey'
  };

  const infoStyle = {
    backgroundColor: '',
    padding: '4px',
    marginBottom: '10px',
    borderRadius: '5px',
    textAlign: 'left',
    fontWeight: 'bold',
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
  
      <div style={{ height: '80px' }}></div>

      <div style={tableContainerStyle}>
        <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'left', fontSize: '25px', fontFamily: 'Century Gothic' }}>Etat d'avancement du dossier</div>
        <div style={{height:'30px'}}></div>
      </div>
      
        <div style={{...tableContainerStyle, backgroundColor:'#f0f0f0'}}>
          <div style={infoStyle}>
            <span style={fieldStyle}>La référence du dossier est :</span> {reference}
          </div>

          <div style={{height:'5px'}}></div>
        
          <div style={infoStyle}>
            {lastRow && lastRow.Id_niveau === 8 && lastRow.Statut_niveau_dossier === 'Terminé' ? (
                <span style={fieldStyle}>Etat du traitement:</span>
            ) : (
                <span style={fieldStyle}>Etat du traitement :</span>
            )}
            {lastRow && lastRow.Id_niveau === 8 && lastRow.Statut_niveau_dossier === 'Terminé' ? (
                <span> Terminé</span> 
            ) : (
                <span> En cours</span>
            )}
        </div>
      </div>

      <div style={{height:'20px'}}></div>

      <div style={tableContainerStyle}>
          <div style={{ overflowY: 'auto', height: '300px', alignItems: 'center'  }}>
        {parcoursDossiers.some(row => row.Id_niveau === 2) ? (
          <div >
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thTitleStyle}>Niveau</th>
                  <th style={thTitleStyle}>Date d'arrivée</th>
                  <th style={thTitleStyle}>Date de Traitement</th>
                  <th style={thTitleStyle}>État</th>
                  <th style={thTitleStyle}>Observations</th>
                </tr>
              </thead>
             
              <tbody>
                {parcoursDossiers.slice().reverse().map((parcoursDossier, index) => (
                  <tr key={index} style={trStyle}>
                    <td style={thTdStyle}>
                      {niveauTextMap[parcoursDossier.Id_niveau]} 
                      {parcoursDossier.Id_niveau === 1 ? ` ${agenceTextMap[parcoursDossier.ID_agence]}` : ''}
                    </td>
                    <td style={thTdStyle}>{formatDate(parcoursDossier.Date_entree)}</td>
                    <td style={thTdStyle}>{parcoursDossier.Date_traitement}</td>
                    <td style={thTdStyle}>
                      {parcoursDossier.Statut_niveau_dossier === 'Nouveau' && (
                        <FaCheckCircle style={{ color: 'orange' }} />
                      )}
                      {parcoursDossier.Statut_niveau_dossier === 'Rejeté' && (
                        <FaTimesCircle style={{ color: 'red' }} />
                      )}
                      {parcoursDossier.Statut_niveau_dossier === 'Terminé' && (
                        <FaCheckCircle style={{ color: 'green' }} />
                      )}
                    </td>
                    <td style={thTdStyle}>{parcoursDossier.Motif_rejet}</td>
                  </tr>
                ))}
              </tbody>
  
            </table>
          </div>
        ) : (
          <div style={{ ...containerStyle, ...centeredTableContainerStyle }}>
            <p>Aucune information disponible pour le moment.</p>
          </div>
        )}
      </div>
      </div>
     
    </div>
  );
  
};

export default DetailsConsultation;