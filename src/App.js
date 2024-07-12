// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import { AuthProvider } from './Pages/AuthContext';
import Registration from './Pages/Registration'
import Dashboard from './Pages/Dashboard'
import DetailsMyDossier from './Pages/DetailsMyDossier';
import Inscription from './Pensionné/Inscription';
import Connexion from './Pensionné/Connexion';
import SuiviDossier from './Pensionné/SuiviDossier';
import Accueil from './Pensionné/Accueil';
import Consultation from './Pages/Consultation';
import DetailsConsultation from './Pages/DetailsConsultation';
import Statistiques from './Pages/Statistiques';
import Modification from './Pages/Modification';
import CheckingNPI from './Pensionné/CheckingNPI';
import Affectations from './Pages/Affectations';
import Retraits from './Pages/Retraits';
import Transmissions from './Pages/Transmissions';

function App() {
  return (
    <AuthProvider>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />}> Login </Route>
          
          <Route path="/Dashboard" element={<Dashboard />}> Dashboard </Route>

          <Route path="/Registration" element={<Registration />}> Registration </Route>

          <Route path="/DetailsMyDossier" element={<DetailsMyDossier />}> DetailsMyDossier </Route>

          <Route path="/Inscription" element={<Inscription />}> Inscription </Route>

          <Route path="/Connexion" element={<Connexion />}> Connexion </Route>

          <Route path="/SuiviDossier" element={<SuiviDossier />}> SuiviDossier </Route>

          <Route path="/Accueil" element={<Accueil />}> Accueil </Route>

          <Route path="/Consultation" element={<Consultation />}> Consultation </Route>

          <Route path="/DetailsConsultation" element={<DetailsConsultation />}> DetailsConsultation </Route>

          <Route path="/Statistiques" element={<Statistiques />}> Statistiques </Route>

          <Route path="/Modification" element={<Modification />}> Modification </Route>

          <Route path="/CheckingNPI" element={<CheckingNPI />}> CheckingNPI </Route>

          <Route path="/Affectations" element={<Affectations />}> Affectations </Route>

          <Route path="/Retraits" element={<Retraits />}> Retraits </Route>

          <Route path="/Transmissions" element={<Transmissions />}> Transmissions </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
  );
}

export default App;
