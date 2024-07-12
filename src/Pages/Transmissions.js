import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Transmissions = () => {
  const navigate = useNavigate();
  const [transmissions, setTransmissions] = useState([]);
  const { Id_niveau } = useAuth();
  const { Id_agence } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  useEffect(() => {
    if (Id_niveau && Id_agence ) {
      fetch(`https://localhost:8000/transattentes/${Id_niveau}/${Id_agence}`)
        .then((res) => res.json())
        .then((data) => {
          setTransmissions(data);
        })
        .catch((err) => console.log(err));
    }
  }, [Id_niveau, Id_agence]);

const handleTransmission = async () => {

  const references = transmissions.map((transmission) => transmission.Reference_dossier);

  const myTransmission = {
    Reference_dossiers: references,
    Id_niveau,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(myTransmission),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(`https://localhost:8000/transmissions`, options);

    if (response.ok) {
      
      const doc = new jsPDF();
            // Obtenez la date et l'heure actuelles
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
            const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

            // Image et redimensionnement
            var img = new Image();
            img.src = 'https://upload.wikimedia.org/wikipedia/fr/9/9a/Caisse_nationale_de_s%C3%A9curit%C3%A9_sociale_%28B%C3%A9nin%29.png';
            img.onload = function() {
              doc.addImage(img, 'PNG', 10, 3, 30, 30); 
              doc.setFontSize(19); 
              doc.setTextColor(135, 206, 250);
              doc.setFont("Times New Roman", "bold");
              doc.text(`CAISSE NATIONALE DE SECURITE SOCIALE`, 55, 10);
              doc.setTextColor(0);
              doc.setFontSize(12); 
              doc.setFont("Times New Roman", "normal");
              doc.text(`390 Avenue Jean Paul II      Tél. (229)21 30 27 27/67/60         E-mail : info@cnss.bj`, 55, 20 );
              doc.text(`01 B.P. 374 COTONOU             Fax: (229)21 30 26 36            Site Web : www.cnss.bj`, 55, 26);
              doc.setFontSize(15); 
              doc.setFont("Times New Roman", "bold");
              doc.text(`DIRECTION DES PRESTATIONS`, 20, 50);
              doc.text(`BORDEREAU DE TRANSMISSION `, 65, 70);
              doc.setFont("Times New Roman", "normal");
              doc.text(`***************`, 91, 75);

              doc.text(`Expéditeur: ${niveauTextMap[Id_niveau]} - ${agenceTextMap[Id_agence]}`, 10, 85);
              doc.text(`Destinataire: ${niveauTextMap[Id_niveau + 1]} - ${agenceTextMap[Id_agence]}`, 10, 95);
              doc.text(`Date de transmission : ${formattedDate} à ${formattedTime}`, 10, 105);

              // Tableau des data
              const tableData = transmissions.map((dossier, index) => ({
                Index: index + 1,
                Numero_pensionne: dossier.Numero_pensionne,
                Nom_pensionne: dossier.Nom_pensionne,
                Prenom_pensionne: dossier.Prenom_pensionne
              }));
              doc.autoTable({
                head: [['         ','Numero du pensionné', 'Nom du pensionné', 'Prénoms du pensionné']],
                body: tableData.map(item => [item.Index, item.Numero_pensionne, item.Nom_pensionne, item.Prenom_pensionne]),
                startY: 115,
                margin: { top: 25 },
                styles: { overflow: 'linebreak', fontSize: 12 },
                columnStyles: { 0: { fontStyle: 'bold' } },
              });

              //Pied de page
              doc.setDrawColor(0); 
              doc.line(10, 280, 200, 280); 
              const footerText = " Agence Cotonou:21 31 23 24 ~ Agence Porto-Novo: 20 21 23 66 ~ Agence Parakou: 23 61 03 74 ~ Agence Abomey: 22 50 03 65 ~ Agence Lokossa: 22 41 11 41 ~ Agence Natitingou: 23 82 13 04";
              doc.setFontSize(6.5); 
              doc.text(footerText, 13, 285);

          // Enregistrez le document
          doc.save(`Bordereau de Transmission.pdf`)

          setTimeout(() => {
            navigate('/Dashboard');
          }, 2000); 
          };
    } else {
      console.error("Erreur lors de la transmission.");
    }
  } catch (error) {
    console.error("Erreur:", error.message);
  }
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
    if (!Array.isArray(transmissions)) {
      console.error('Les données de transmissions ne sont pas un tableau :', transmissions);
      return null; 
    }

    const filteredTransmissions = transmissions.filter(dossier => dossier.Statut_transmission === 'A transmettre');
  
    return filteredTransmissions.map((transmission, index) => (
      <tr key={index} style={trStyle}>
        <td style={thTdStyle}>{transmission.Numero_pensionne}</td>
        <td style={thTdStyle}>{transmission.Reference_dossier}</td>
        <td style={thTdStyle}>{transmission.Id_destinataire}</td>
        <td style={thTdStyle}>{agenceTextMap[transmission.Id_agence_destination]}</td>
        <td style={thTdStyle}>{transmission.Statut_transmission}</td>
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
      <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'center', fontSize: '25px', fontFamily: 'Century Gothic' }}>Mes transmissions</div>
      </div>


      <div style={{height:'20px'}}></div>

      <div style={tableContainerStyle}>
      <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'left',fontFamily: 'Calibri', fontSize: '18px' }}>Transmissions en attentes</div>
      <div style={{height:'15px'}}></div>
        
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTitleStyle}>Référence du dossier</th>
              <th style={thTitleStyle}>Numero de pensionné</th>
              <th style={thTitleStyle}>Agence de provenance</th>
              <th style={thTitleStyle}>Statut transmission</th>
            </tr>
          </thead>
          <tbody>{generateTableRows()}</tbody>
        </table>  
      </div>

      <div style={{height:'50px'}}></div>

      <button
            style={{
              backgroundColor: '#1412b2',
              color: 'white',
              fontWeight: 'bold',
              padding: '17px', 
              width: '450px',
              borderRadius: '10px',
              borderColor: 'white',
              cursor: 'pointer',
              marginRight: '10px',
              display: 'flex', 
              alignItems: 'center' ,
              height: '80px'
            }}
            onClick={handleTransmission}
          >
            <span style={{ marginRight: '30px' }}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy5iACh1G5RNYQrplt2I1t6UgDHFJeQljz_n2QU5bpUya858IJWYtYKoML9zuc9Mx0nzE&usqp=CAU" alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            </span>
            Transmettre
          </button>
    </div>

  );
};

export default Transmissions;
