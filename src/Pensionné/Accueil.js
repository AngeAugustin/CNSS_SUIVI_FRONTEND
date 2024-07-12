import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Accueil = () => {
    const navigate = useNavigate();
    const [reference, setReference] = useState('');
    const [error, setError] = useState('');

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50px', // Pour décaler le contenu vers le bas
        textAlign: 'center', // Centrage des éléments enfants
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (reference.trim() === '') {
            setError('Veuillez entrer une référence.');
            return;
        }
        // Naviguer vers la page de suivi du dossier en transmettant la référence dans l'URL
        navigate(`/SuiviDossier?reference=${reference}`);
    };

    const handleReferenceChange = (e) => {
        setReference(e.target.value);
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

      const pageStyle = {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        justifyContent: 'start',
      };

      const buttonStyle = {
        margin: '10px',
        padding: '15px 30px',
        background: '#1412b2',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '730px',
        fontSize:'17px'
      };

      const inputContainerStyle = {
        display: 'flex',
        justifyContent: 'center', // Centrer horizontalement
      };

      const inputStyle = {
        margin: '10px',
        padding: '10px',
        width: '700px', // Utilisez toute la largeur disponible
        textAlign: 'left',
        border:'',
        borderRadius:'5px',
        height:'30px'
      };

    return (
        <div style={pageStyle}>
            <div style={headerStyle}>
                <header style={{ width: '100%', backgroundColor: '#1214b2', color: '#fff', padding: '0px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/Connexion">
          <img src="https://play-lh.googleusercontent.com/TZVxPxjrpyVaJXUHZBxOc0Lz8AGNHST3nMEN3tXO-MO9EUtJRxQYe9uK_0bXYk1RQviG" alt="Caisse Nationale de Sécurité Sociale" style={{ marginRight: '10px', width: '70px', height: 'auto' }} />
          </Link>
                        <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>CAISSE NATIONALE DE SECURITE SOCIALE</div>
                    </div>
                </header>
            </div>

            <div style={{height:'70px'}}></div>

            {/* Contenu de la page d'accueil */}
            <div style={containerStyle}>
                <form onSubmit={handleSubmit}>
                <label htmlFor="reference" style={{ fontSize: '20px' }}>Entrer la référence de votre Dossier</label><br />
                <div style={{ height: '15px' }}></div>
                {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
                <div style={{ height: '15px' }}></div>
                    
                    <div style={inputContainerStyle}> 
                    <div style={{ height: '10px' }}></div>
                    <input
                        type="text"
                        placeholder=""
                        style={inputStyle}
                        value={reference}
                        onChange={handleReferenceChange}
                    />
                    </div>
                    
                    <div style={{ height: '10px' }}></div>
                    <button type="submit" style={buttonStyle}>Rechercher</button>
                </form>
            </div>
        </div>
    );
};

export default Accueil;
