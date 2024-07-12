import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaUser, FaSignOutAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


const Dashboard = () => {
  const navigate = useNavigate();
  const [dossiers, setDossiers] = useState([]);
  const { Id_niveau } = useAuth();
  const { Id_agence } = useAuth();
  const { Id_acteur } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [checkedDossiers, setCheckedDossiers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [acteurs, setActeurs] = useState([]); 
  const [selectedActor, setSelectedActor] = useState(null);

const handleActorSelect = (acteur) => {
  setSelectedActor(acteur); // Mise à jour de l'acteur sélectionné
};
  
  useEffect(() => {
    if (Id_niveau && Id_agence ) {
      fetch(`https://localhost:8000/dashboard/${Id_niveau}/${Id_agence}`)
        .then((res) => res.json())
        .then((data) => {
          setDossiers(data);
        })
        .catch((err) => console.log(err));
    }
  }, [Id_niveau, Id_agence]);
  

  const handleCheckboxChange = (reference) => {
    if(Id_niveau === 2 || Id_niveau === 4 || Id_niveau === 7 ){
      setCheckedDossiers((prev) => {
        if (prev.includes(reference)) {
          return prev.filter((ref) => ref !== reference);
        } else {
          return [...prev, reference];
        }
      });
    }
  };


  const handleAffecterClick = () => {
    setIsModalOpen(true);
    fetch(`https://localhost:8000/listagents/${Id_niveau}/${Id_agence}`)
      .then((res) => res.json())
      .then((data) => {
        setActeurs(data);
      })
      .catch((err) => console.error(err));
  };


const handleOkClick = async (selectedActorId) => {
  if (checkedDossiers.length === 0) {
    console.log("Aucun dossier sélectionné.");
    return;
  }

  const myAffectation = {
    Reference_dossiers: checkedDossiers,
    Id_affecte: selectedActorId,
    Id_acteur,
    Id_niveau,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(myAffectation),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(`https://localhost:8000/affectations`, options);

    if (response.ok) {
      console.log("Affectation réussie.");
      navigate('/Dashboard');
    } else {
      console.error("Erreur lors de l'affectation.");
    }
  } catch (error) {
    console.error("Erreur:", error.message);
  }
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDetailsClick = (dossier) => {
    navigate(`/DetailsMyDossier`, { state: dossier });
  };

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

  const headerContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    margin: '0 auto',
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
    borderBottom: '1px solid #ccc', // Ajout d'une bordure inférieure grise
  };

  const generateTableRows = () => {
    if (!Array.isArray(dossiers)) {
      console.error('Les données de dossiers ne sont pas un tableau :', dossiers);
      return null; 
    }
    
  
    const filteredDossiers = dossiers.filter(dossier => dossier.Statut_global_dossier !== 'Terminé');
  
    return filteredDossiers.map((dossier, index) => (
      <tr key={index} style={trStyle}>
        <td style={thTdStyle}>
          <input
            type="checkbox"
            checked={checkedDossiers.includes(dossier.Reference_dossier)}
            onChange={() => handleCheckboxChange(dossier.Reference_dossier)}
          />
        </td>
        <td style={thTdStyle}>{dossier.Reference_dossier}</td>
        <td style={thTdStyle}>{agenceTextMap[dossier.ID_agence]}</td>
        <td style={thTdStyle}>{formatDate(dossier.Date_enregistrement)}</td>
        <td style={thTdStyle}>{dossier.Numero_pensionne}</td>
        <td style={thTdStyle}>{`${dossier.Nom_pensionne}  ${dossier.Prenom_pensionne}`}</td>
        <td style={thTdStyle}>
          {dossier.Statut_niveau_dossier === 'Nouveau' && (
            <FaCheckCircle style={{ color: 'orange' }} />
          )}
          {dossier.Statut_niveau_dossier === 'Rejeté' && (
            <FaTimesCircle style={{ color: 'red' }} />
          )}
          {dossier.Statut_niveau_dossier === 'Terminé' && (
            <FaCheckCircle style={{ color: 'green' }} />
          )}
          {dossier.Statut_niveau_dossier === 'Affecté' && (
            <FaCheckCircle style={{ color: 'blue' }} />
          )}
          {dossier.Statut_niveau_dossier === 'Retiré' && (
            <FaCheckCircle style={{ color: 'purple' }} />
          )}
        </td>
        <td style={thTdStyle}>
          {dossier.Statut_global_dossier === 'Nouveau' && (
            <FaCheckCircle style={{ color: 'orange' }} />
          )}
          {dossier.Statut_global_dossier === 'En cours' && (
            <FaCheckCircle style={{ color: 'orange' }} />
          )}
          {dossier.Statut_global_dossier === 'Terminé' && (
            <FaCheckCircle style={{ color: 'green' }} />
          )}
        </td>
        <td style={thTdStyle}>
          <button
            style={{ backgroundColor: '#1412b2', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer'}}
            onClick={() => handleDetailsClick(dossier)}
          >
            Voir les détails
          </button>
        </td>
      </tr>
    ));
  };
  

  return (
    <div style={pageStyle}>
      
      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://play-lh.googleusercontent.com/TZVxPxjrpyVaJXUHZBxOc0Lz8AGNHST3nMEN3tXO-MO9EUtJRxQYe9uK_0bXYk1RQviG" alt="Caisse Nationale de Sécurité Sociale" style={{ marginRight: '10px', width: '70px', height: 'auto' }} />
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
      <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'center', fontSize: '25px', fontFamily: 'Century Gothic' }}>Tableau de bord</div>
      </div>

      <div style={{height:'10px'}}></div>

      <div style={{height:'140px', width:'100%', backgroundColor:'#f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <div style={headerContainerStyle}>
          <button
            style={{
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 'bold',
              padding: '17px', 
              width: '500px',
              borderRadius: '10px',
              borderColor: 'white',
              cursor: 'pointer',
              marginRight: '10px',
              display: 'flex', 
              alignItems: 'center' 
            }}
            onClick={() => navigate('/Registration')}
          >
            <span style={{ marginRight: '30px' }}>
              <img src="https://img.freepik.com/psd-premium/3d-adicionar-nova-ilustracao-de-icone-de-pasta-de-arquivo_148391-974.jpg?size=626&ext=jpg" alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            </span>
            Créer un dossier
          </button>

            <div style={{width:'50px'}}></div>

            <button
            style={{
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 'bold',
              padding: '17px', 
              width: '500px',
              borderRadius: '10px',
              borderColor: 'white',
              cursor: 'pointer',
              marginRight: '10px',
              display: 'flex', 
              alignItems: 'center' 
            }}
            onClick={() => navigate('/Consultation')}
          >
            <span style={{ marginRight: '30px' }}>
              <img src="https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-magnifying-glass-icon-png-image_1657158.jpg" alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            </span>
            Rechercher un dossier
          </button>

            <div style={{width:'60px'}}></div>

            <button
            style={{
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 'bold',
              padding: '17px',
              width: '500px',
              borderRadius: '10px',
              borderColor: 'white',
              cursor: 'pointer',
              marginRight: '10px',
              display: 'flex', 
              alignItems: 'center' 
            }}
            onClick={() => navigate('/Transmissions')}
          >
            <span style={{ marginRight: '30px' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/1037/1037316.png" alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            </span>
            Mes transmissions
          </button>
            
          </div>
          
      </div>
     
      <div style={{height:'140px', width:'100%', backgroundColor:'#f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <div style={headerContainerStyle}>
          <button
            style={{
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 'bold',
              padding: '17px', 
              width: '500px',
              borderRadius: '10px',
              borderColor: 'white',
              cursor: 'pointer',
              marginRight: '10px',
              display: 'flex', 
              alignItems: 'center' 
            }}
            onClick={() => navigate('/Affectations')}
          >
            <span style={{ marginRight: '30px' }}>
              <img src="https://img.freepik.com/vecteurs-premium/dossier-fleche-circulaire-reseau-internet-symbole-document-illustration-vectorielle_756957-951.jpg" alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            </span>
            Mes affectations
          </button>

            <div style={{width:'100px'}}></div>

          <button
            style={{
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 'bold',
              padding: '17px',
              width: '500px',
              borderRadius: '10px',
              borderColor: 'white',
              cursor: 'pointer',
              marginRight: '10px',
              display: 'flex', 
              alignItems: 'center' 
            }}
            onClick={() => navigate('/Statistiques')}
          >
            <span style={{ marginRight: '30px' }}>
              <img src="https://www.pngall.com/wp-content/uploads/9/Statistics-PNG-Clipart.png" alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            </span>
            Visualiser les statistiques
          </button>
            
          </div>
          
      </div>
    


      <div style={{height:'25px'}}></div>

      <div style={tableContainerStyle}>
      <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'left',fontFamily: 'Calibri', fontSize: '18px' }}>Dossiers récents</div>
      <div style={{height:'15px'}}></div>
        
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTitleStyle}>Cocher</th>
              <th style={thTitleStyle}>Référence du dossier</th>
              <th style={thTitleStyle}>Agence de provenance</th>
              <th style={thTitleStyle}>Date d'enregistrement</th>
              <th style={thTitleStyle}>Numéro de pensionné</th>
              <th style={thTitleStyle}>Noms et Prénoms</th>
              <th style={thTitleStyle}>Statut à ce niveau </th>
              <th style={thTitleStyle}>Statut global</th>
              <th style={thTitleStyle}>Action</th>
            </tr>
          </thead>
          <tbody>{generateTableRows()}</tbody>
        </table>
        
      </div>

      {checkedDossiers.length > 0 && (
        <button
          onClick={handleAffecterClick}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#1412b2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Affecter dossier
        </button>
      )}

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '100px',
            borderRadius: '10px',
            zIndex: 1000,
          }}
        >
          <h2>Mes agents</h2>
          <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTitleStyle}>Nom de l'agent</th>
              <th style={thTitleStyle}>Identifiant de l'acteur</th>
              <th style={thTitleStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {acteurs.map((acteur, index) => (
              <tr key={index} style={trStyle}>
                <td style={thTdStyle}>{acteur.Username}</td>
                <td style={thTdStyle}>{acteur.Id_acteur}</td>
                <td style={thTdStyle}>
                  <button
                    onClick={() => {
                      setSelectedActor(acteur); // Sélectionner l'acteur
                      handleOkClick(acteur.Id_acteur); // Appuyer sur "OK"
                      navigate('/Dashboard');
                    }}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: selectedActor?.Id_acteur === acteur.Id_acteur ? 'blue' : '#1412b2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    OK
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={handleCloseModal}
        />
      )}
    </div>

  );
};

export default Dashboard;
