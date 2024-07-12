import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaUser, FaSignOutAlt, FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();

  const [numeroPensionne, setNumeroPensionne] = useState('');
  const [numeroAssure, setNumeroAssure] = useState('');
  const [nomPensionne, setNomPensionne] = useState('');
  const [prenomPensionne, setPrenomPensionne] = useState('');
  const [telephonePensionne, setTelephonePensionne] = useState('');
  const [adressePensionne, setAdressePensionne] = useState('');
  const [npi, setNpi] = useState('');
  const [typeDossier, setTypeDossier] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { Id_acteur } = useAuth();
  const { Id_agence } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [referenceDossier, setReferenceDossier] = useState('');

  
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

  const [uploadedFiles, setUploadedFiles] = useState({
    acteDeces: null,
    acteMariage: null,
    acteNaissance1: null,
    acteNaissance2: null,
  });

  const handleFileChange = (event, fileKey) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [fileKey]: { file, url: fileUrl, name: file.name },
      }));
    }
  };

  const handleFileRemove = (fileKey) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = { ...prevFiles };
      delete updatedFiles[fileKey];
      return updatedFiles;
    });
  };

  const handleRegistration = async () => {
    if (!numeroPensionne || !nomPensionne || !prenomPensionne || !telephonePensionne || !adressePensionne || !npi || !typeDossier) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setSuccessMessage('');
    } else {
      try {
        const referenceDossierString = numeroAssure.slice(-5) + numeroAssure.slice(0, 5);
        setReferenceDossier(referenceDossierString);

        const myRegistration = {
          Numero_pensionne: numeroPensionne,
          Nom_pensionne: nomPensionne,
          Prenom_pensionne: prenomPensionne,
          Telephone_pensionne: telephonePensionne,
          Adresse_pensionne: adressePensionne,
          Numero_assure: numeroAssure,
          NPI: npi,
          Type_dossier: typeDossier,
          Id_acteur,
          Id_agence,
          Date_enregistrement: new Date().toISOString(),
          Reference_dossier: referenceDossierString,
          Id_niveau: 1,
          Date_entree: new Date().toISOString(),
          Date_traitement: new Date().toISOString(),
          Statut_niveau_dossier: 'Nouveau',
          Statut_global_dossier: 'Nouveau'
        };

        const options = {
          method: 'POST',
          body: JSON.stringify(myRegistration),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const response = await fetch(`https://localhost:8000/createDossier/${Id_acteur}/${Id_agence}`, options);

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          navigate('/Dashboard');
        } else {
          throw new Error('Une erreur s\'est produite');
        }
      } catch (error) {
        console.log(error.message);
        setErrorMessage('Erreur lors de l\'enregistrement.');
        setSuccessMessage('');
      }
    }
  };

   const inputFileStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: '#fff',
    padding: '13px',
    marginBottom: '10px',
    borderRadius: '10px',
    width: '95%',
    height: '25px',
    border: 'none'
  };

  const iconStyle = {
    marginRight: '10px',
  };

  const pageStyle = {
    backgroundColor: '#fff',
    height: '140vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
  };

  const formContainerStyle = {
    backgroundColor: '#f0f0f0',
    padding: '50px',
    borderRadius: '15px',
    width: '800px',
    textAlign: 'center',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '620px',
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
    height: '25px',
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
    width: '54%',
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
      <div style={{ marginLeft: '0px', display: 'flex', textAlign: 'center', fontSize: '25px', fontFamily: 'Arial' }}>Créer un dossier</div>
      </div>

      <div style={formContainerStyle}>
        <img src="https://static.vecteezy.com/system/resources/previews/022/359/321/non_2x/3d-folder-file-icon-illustration-png.png" alt="Avatar" style={{ width: '70px', height: '70px', borderRadius: '50%' }} />
        <div style={{ height: '20px' }}></div>
        <style>{keyframes}</style>
        <div style={{ height: '10px' }}></div>
        <style>{keyframes}</style>
        {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        {successMessage && <p style={successStyle}>{successMessage}</p>}

        <div style={{ height: '20px' }}></div>

        {/* Boutons radio pour sélectionner le type de dossier */}
        <div style={{ fontSize: '17px' }}>
          <label>
            <input
              type="radio"
              value="Pension titulaire"
              checked={typeDossier === 'Pension titulaire'}
              onChange={(e) => setTypeDossier(e.target.value)}
            />
            Pension Titulaire
          </label>
          <label>
            <input
              type="radio"
              value="Pension de survivant veuve"
              checked={typeDossier === 'Pension de survivant veuve'}
              onChange={(e) => setTypeDossier(e.target.value)}
            />
            Pension de Survivant veuve
          </label>
          <label>
            <input
              type="radio"
              value="Pension de survivant orphelin"
              checked={typeDossier === 'Pension de survivant orphelin'}
              onChange={(e) => setTypeDossier(e.target.value)}
            />
            Pension de Survivant orphelin
          </label>
        </div>

        <div style={{ height: '50px' }}></div>

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

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ width: '48%' }}>
          <label style={inputFileStyle}>
            <FaUpload style={iconStyle} />
            <span>{uploadedFiles.acteMariage ? uploadedFiles.acteMariage.name : 'Acte de mariage'}</span>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, 'acteMariage')}
              style={{ display: 'none' }}
            />
          </label>
          {uploadedFiles.acteMariage && (
            <div>
              <a href={uploadedFiles.acteMariage.url} target="_blank" rel="noopener noreferrer">
                {uploadedFiles.acteMariage.name}
              </a>
              <button onClick={() => handleFileRemove('acteMariage')} style={{ cursor: 'pointer', color: 'red', border: 'none', background: 'none' }}>
                &times;
              </button>
            </div>
          )}
        </div>

        <div style={{ width: '48%' }}>
        <label style={inputFileStyle}>
            <FaUpload style={iconStyle} />
            <span>{uploadedFiles.acteDeces ? uploadedFiles.acteDeces.name : 'Acte de décès'}</span>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, 'acteDeces')}
              style={{ display: 'none' }}
            />
          </label>
          {uploadedFiles.acteDeces && (
            <div>
              <a href={uploadedFiles.acteDeces.url} target="_blank" rel="noopener noreferrer">
                {uploadedFiles.acteDeces.name}
              </a>
              <button onClick={() => handleFileRemove('acteDeces')} style={{ cursor: 'pointer', color: 'red', border: 'none', background: 'none' }}>
                &times;
              </button>
            </div>
          )}
        </div>
        </div>
        
         <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ width: '48%' }}>
          <label style={inputFileStyle}>
            <FaUpload style={iconStyle} />
            <span>{uploadedFiles.acteNaissance1 ? uploadedFiles.acteNaissance1.name : 'Acte de naissance Enfant 1'}</span>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, 'acteNaissance1')}
              style={{ display: 'none' }}
            />
          </label>
          {uploadedFiles.acteNaissance1 && (
            <div>
              <a href={uploadedFiles.acteNaissance1.url} target="_blank" rel="noopener noreferrer">
                {uploadedFiles.acteNaissance1.name}
              </a>
              <button onClick={() => handleFileRemove('acteNaissance1')} style={{ cursor: 'pointer', color: 'red', border: 'none', background: 'none' }}>
                &times;
              </button>
            </div>
          )}
        </div>
        
        <div style={{ width: '48%' }}>
          <label style={inputFileStyle}>
              <FaUpload style={iconStyle} />
              <span>{uploadedFiles.acteNaissance2 ? uploadedFiles.acteNaissance2.name : 'Acte de naissance Enfant 2'}</span>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'acteNaissance2')}
                style={{ display: 'none' }}
              />
            </label>
            {uploadedFiles.acteNaissance2 && (
              <div>
                <a href={uploadedFiles.acteNaissance2.url} target="_blank" rel="noopener noreferrer">
                  {uploadedFiles.acteNaissance2.name}
                </a>
                <button onClick={() => handleFileRemove('acteNaissance2')} style={{ cursor: 'pointer', color: 'red', border: 'none', background: 'none' }}>
                  &times;
                </button>
              </div>
            )}
        </div>
        </div>

      </div>
      
      <button
        style={{
          backgroundColor: '#1412b2',
          color: 'white',
          fontWeight: 'bold',
          padding: '17px',
          width: '900px',
          borderRadius: '10px',
          borderColor: 'white',
          cursor: 'pointer',
          marginRight: '0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleRegistration}>
        <span style={{ marginRight: '20px', }}>
          <img src="https://img.freepik.com/psd-premium/3d-adicionar-nova-ilustracao-de-icone-de-pasta-de-arquivo_148391-974.jpg?size=626&ext=jpg" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </span>
        Enregistrer
      </button>
    </div>
  );
};

export default Registration;
