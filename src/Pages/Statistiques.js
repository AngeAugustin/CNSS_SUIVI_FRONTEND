import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaUser, FaSignOutAlt} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';


const Statistiques = () => {
  const navigate = useNavigate();
  const [dossiers, setDossiers] = useState([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [staGlobalNouv, setStaGlobalNouv] = useState(0);
  const [staGlobalEncours, setStaGlobalEncours] = useState(0);
  const [staGlobalTerm, setStaGlobalTerm] = useState(0);

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
    
      fetch(`https://localhost:8000/stats`)
        .then((res) => res.json())
        .then((data) => {
          setDossiers(data);

          const countStaGlobalNouv = data.filter((dossier) => dossier.Statut_global_dossier === 'Nouveau').length;
          const countStaGlobalEncours = data.filter((dossier) => dossier.Statut_global_dossier === 'En cours').length;
          const countStaGlobalTerm = data.filter((dossier) => dossier.Statut_global_dossier === 'Terminé').length;
        
          setStaGlobalNouv(countStaGlobalNouv);
          setStaGlobalEncours(countStaGlobalEncours);
          setStaGlobalTerm(countStaGlobalTerm);
        })
        .catch((err) => console.log(err));
   
  });

  const data = [
    { id: 0, value: staGlobalNouv, label: 'Nouveau', color: '#1412b2' }, // Couleur pour Nouveau
    { id: 1, value: staGlobalEncours, label: 'En cours', color: 'orange' }, // Couleur pour En cours
    { id: 2, value: staGlobalTerm, label: 'Terminé', color: 'green' }, // Couleur pour Terminé
  ];

  const pageStyle = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    justifyContent: 'start',
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

  const handleLogout = () => {
    navigate('/login'); 
  };

  const handleUserIconClick = () => {
    setUserMenuOpen(!userMenuOpen); 
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

  const containerStyle = {
    margin: '30px',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width:'500px',
    height:'300px'
  };

  const tableContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '20px',
    width: '55%',
    borderRadius: '8px',
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

      <div style={{height:'90px'}}></div>

        
      <div style={tableContainerStyle}>
           <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'center', fontSize: '25px', fontFamily: 'Century Gothic' }}> Statistiques </div>
      </div>
      
     
      <div style={{height:'20px'}}></div>

   
      <div style={containerStyle}> 
      <PieChart
            series={[
                {
                data,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
            ]}
            height={300}
            />
      </div>

            
    </div>
  );
};

export default Statistiques;
