import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaUser, FaSignOutAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';


const DetailsMyDossier = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { Id_niveau } = useAuth();

  const { Id_acteur } = useAuth();
  const dossier = location.state;
  const [numeroPensionne, setNumeroPensionne] = useState('');
  const [nomPensionne, setNomPensionne] = useState('');
  const [prenomPensionne, setPrenomPensionne] = useState('');
  const [referenceDossier, setReferenceDossier] = useState('');
  const [dateEnregistrement, setDateEnregistrement] = useState('');
  const [parcoursDossiers, setParcoursDossier] = useState([]);
  const [lastRowIdNiveau, setLastRowIdNiveau] = useState(null); 
  const [motifRejet, setMotifRejet] = useState('');
  const [notification, setNotification] = useState(null); 
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    setReferenceDossier(dossier?.Reference_dossier || '');
    setNumeroPensionne(dossier?.Numero_pensionne || '');
    setNomPensionne(dossier?.Nom_pensionne || '');
    setPrenomPensionne(dossier?.Prenom_pensionne || '');
    setDateEnregistrement(dossier?.Date_enregistrement || '');

    // Vérification du Num_assure avant de récupérer les détails
    if (dossier?.Reference_dossier) {
      fetch(`https://localhost:8000/details/${dossier.Reference_dossier}`)
        .then((res) => res.json())
        .then((data) => {
          setParcoursDossier(data);
          if (data.length > 0) {
            setLastRowIdNiveau(data[data.length - 1].Id_niveau); 
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails du dossier:', error);
        });
    }
  }, [dossier]);

  const pageStyle = {
    backgroundColor: '#fff',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  display: 'flex', 
  justifyContent: 'space-between',
  alignItems: 'center'
};

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

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '',
    borderRadius: '10px',
    border: 'none',
    
  };

  const thTdStyle = {
    border: 'none',
    padding: '10px',
    backgroundColor: '',
    borderRadius: '10px',
    textAlign: 'start',
  };

  const greenButtonStyle = {
    
    backgroundColor: 'white', // Vert standard
    color: '#fff',
  };

  const redButtonStyle = {
    
    backgroundColor: 'white', // Rouge pur
    color: '#fff',
  };
  
  const thTitleStyle = {
    border: 'none',
    padding: '10px',
    textAlign: 'start',
    backgroundColor:'#fff',
    color:'grey'
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };  
  

  const handleValidation = async () => {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir valider ce dossier ?');
    if (confirmation) {
    try {
      const myValidation = {
        Reference_dossier: referenceDossier,
      };
      const options = {
        method: 'POST',
        body: JSON.stringify(myValidation),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await fetch(`https://localhost:8000/valider/${dossier.Reference_dossier}/${Id_niveau}/${Id_acteur}`, options);
          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            showNotification("Dossier validé avec succès!", "success");
          setTimeout(() => {
            navigate('/Dashboard');
          }, 2000); 
          
          } else {
            throw new Error('Une erreur s\'est produite');
          }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
    }
  }

  const handleRejet = async () => {
    try {
        const motif = window.prompt('Veuillez saisir le motif de rejet :');
        if (motif !== null) {
          const confirmation = window.confirm('Êtes-vous sûr de vouloir rejeter ce dossier ?');
          if (confirmation) {
            setMotifRejet(motif);
            const myRejet = {
                Reference_dossier: referenceDossier,
            };
            const options = {
                method: 'POST',
                body: JSON.stringify(myRejet),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch(`https://localhost:8000/rejeter/${dossier.Reference_dossier}/${Id_niveau}/${Id_acteur}/${encodeURIComponent(motif)}`, options);
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);

                showNotification("Dossier rejeté avec succès!", "error");
                setTimeout(() => {
                  navigate('/Dashboard');
                }, 2000); 
              }
            } else {
                throw new Error('Une erreur s\'est produite');
            }
        }
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
};

const handleAnnuler = async () => {
  const confirmation = window.confirm('Êtes-vous sûr de vouloir annuler ce dossier ?');
  if (confirmation) {
  try {
    const myAnnulation = {
      Reference_dossier: referenceDossier,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(myAnnulation),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch(`https://localhost:8000/annuler/${dossier.Reference_dossier}`, options);
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
        showNotification("Dossier annulé avec succès!", "cancel");
        setTimeout(() => {
          navigate('/Dashboard');
        }, 3000); 
        } else {
          throw new Error('Une erreur s\'est produite');
        }
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}
};

const handleLogout = () => {
  navigate('/login'); 
};

const handleModifier = (e) => {
  e.preventDefault();
  navigate(`/Modification?Reference_dossier=${referenceDossier}`);
};

const handleUserIconClick = () => {
  setUserMenuOpen(!userMenuOpen); 
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

  const formatDate = (dateString) => {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
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
      

      <div style={{height:'80px'}}></div>

      <div style={tableContainerStyle}>
      <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'left', fontSize: '30px', fontFamily: 'Century Gothic', }}>Détails du dossier</div>
      <div style={{height:'25px'}}></div>
      <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'left', fontFamily: 'Calibri', fontSize: '18px' }}>Informations du dossier</div>
      </div>
      
      <div style={{...tableContainerStyle, backgroundColor:'#f0f0f0'}}>
        <div style={{ ...infoStyle }}>
          <span style={{ ...fieldStyle }}>Numéro de pensionné :</span> {numeroPensionne}
        </div>
        <div style={{ ...infoStyle }}>
          <span style={{ ...fieldStyle }}>Nom du pensionné :</span> {nomPensionne}
        </div>
        <div style={{ ...infoStyle }}>
          <span style={{ ...fieldStyle }}>Prénoms du pensionné :</span> {prenomPensionne}
        </div>
        <div style={{ ...infoStyle }}>
          <span style={{ ...fieldStyle }}>Date d'enregistrement :</span> {formatDate(dateEnregistrement)}
        </div>
      </div>

      <div style={{height:'20px'}}></div>
      
      <div style={tableContainerStyle}>
        <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'left', fontFamily: 'Calibri', fontSize: '18px' }}>Parcours du dossier</div>
        <div style={{height:'20px'}}></div>
      
      <div style={{ overflowY: 'auto', height: '300px', alignItems: 'center'  }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTitleStyle}>Niveau</th>
              <th style={thTitleStyle}>Date d'arrivée</th>
              <th style={thTitleStyle}>Date de Traitement</th>
              <th style={thTitleStyle}>État</th>
              <th style={thTitleStyle}>Motif de rejet</th>
            </tr>
          </thead>
          <tbody>
          {parcoursDossiers.map((parcoursDossier, index) => (
            <tr key={index} style={trStyle}>
              <td style={thTdStyle}>
                {niveauTextMap[parcoursDossier.Id_niveau]} 
                {parcoursDossier.Id_niveau === 1 ? ` ${agenceTextMap[parcoursDossier.ID_agence]}` : ''}
              </td>
              <td style={thTdStyle}>{formatDate(parcoursDossier.Date_entree)}</td>
              <td style={thTdStyle}>
                {(index === parcoursDossiers.length - 1 && parcoursDossier.Id_niveau !== 8) ? "  " : formatDate(parcoursDossier.Date_traitement)}
              </td>
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
                {parcoursDossier.Statut_niveau_dossier === 'Affecté' && (
                  <FaCheckCircle style={{ color: 'blue' }} />
                )}
                {parcoursDossier.Statut_niveau_dossier === 'Retiré' && (
                  <FaCheckCircle style={{ color: 'purple' }} />
                )}
              </td>
              <td style={thTdStyle}>{parcoursDossier.Motif_rejet}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      </div>


      <div style={{ display: 'flex', justifyContent: 'center' }}>

      { Id_niveau !== 2 && Id_niveau !== 4 && Id_niveau !== 7 && (
        <button
          style={{
            backgroundColor: lastRowIdNiveau === Id_niveau ? greenButtonStyle.backgroundColor : '#white',
            cursor: lastRowIdNiveau === Id_niveau ? 'pointer' : 'not-allowed',
              color: 'black',
              padding: '17px', // Réduit la taille du padding pour laisser de la place à l'avatar
              borderRadius: '10px',
              border: 'none',
              marginRight: '10px',
              display: 'flex', // Permet d'aligner l'avatar et le texte horizontalement
              alignItems: 'center',
              fontSize: '16px',
              justifyContent: 'center',
              height: '60px',
              width: '230px',
          }}
          onClick={handleValidation}
          disabled={lastRowIdNiveau !== Id_niveau}
        >
           <span style={{ marginRight: '' }}>
              <img src="https://e7.pngegg.com/pngimages/947/160/png-clipart-green-check-illustration-checked-in-circle-icons-logos-emojis-submit.png" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            </span>
        </button>
        )}

        {Id_niveau !== 1 && lastRowIdNiveau !== 1 && Id_niveau !== 2 && Id_niveau !== 4 && Id_niveau !== 7 && (
          <button
            style={{
              backgroundColor: lastRowIdNiveau === Id_niveau ? redButtonStyle.backgroundColor : '#white',
              cursor: lastRowIdNiveau === Id_niveau ? 'pointer' : 'not-allowed',
              color: 'black',
              padding: '17px', // Réduit la taille du padding pour laisser de la place à l'avatar
              borderRadius: '10px',
              border: 'none',
              marginRight: '10px',
              display: 'flex', // Permet d'aligner l'avatar et le texte horizontalement
              alignItems: 'center',
              fontSize: '16px',
              justifyContent: 'center',
              height: '60px',
              width: '230px',
            }}
            onClick={handleRejet}
            disabled={lastRowIdNiveau !== Id_niveau}
          >
            <span style={{ marginRight: '' }}>
              <img src="https://thumbs.dreamstime.com/b/ic%C3%B4ne-de-rejet-rejeter-l-illustration-matricielle-sur-un-fond-blanc-plate-isol%C3%A9e-sans-personne-234252057.jpg" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            </span>
            
          </button>
        )}

        {Id_niveau === 1 && lastRowIdNiveau === 1 && parcoursDossiers.length === 1 && Id_niveau !== 2 && Id_niveau !== 4 && Id_niveau !== 7 &&  (
          <button
            style={{
              backgroundColor: 'white',
              cursor: 'pointer',
              color: 'black',
              padding: '17px', // Réduit la taille du padding pour laisser de la place à l'avatar
              height: '60px',
              width: '230px',
              borderRadius: '10px',
              border: 'none',
              marginRight: '10px',
              display: 'flex', // Permet d'aligner l'avatar et le texte horizontalement
              alignItems: 'center',
              fontSize: '16px',
              justifyContent: 'center',
            }}
            onClick={handleAnnuler}
          >
            <span style={{ marginRight: '' }}>
              <img src="https://previews.123rf.com/images/faysalfarhan/faysalfarhan1502/faysalfarhan150200247/36069539-annuler-ic%C3%B4ne-bouton-orange-vitreux.jpg" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            </span>
            
          </button>
        )}

        { lastRowIdNiveau === 1 && Id_niveau === 1 && (
          <button
            style={{
              backgroundColor: 'white',
              cursor: 'pointer',
              color: 'black',
              padding: '17px', // Réduit la taille du padding pour laisser de la place à l'avatar
              height: '60px',
              width: '230px',
              borderRadius: '10px',
              border: 'none',
              marginRight: '10px',
              display: 'flex', // Permet d'aligner l'avatar et le texte horizontalement
              alignItems: 'center',
              fontSize: '16px',
              justifyContent: 'center',
            }}
            onClick={handleModifier}
          >
            <span style={{ marginRight: '' }}>
              <img src="https://cdn.icon-icons.com/icons2/1154/PNG/512/1486564394-edit_81508.png" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            </span>

          </button>
        )}
      </div>

      {notification && (
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: notification.type === 'success' ? 'green' : notification.type === 'error' ? 'red' : 'orange', color: '#fff', padding: '20px', borderRadius: '5px', zIndex: '9999' }}>
        {notification.message}
      </div>
      )}
      </div>
  );
};

export default DetailsMyDossier;