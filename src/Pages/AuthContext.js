import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [Id_niveau, setId_niveau] = useState(null);
  const [Id_acteur, setId_acteur] = useState(null);
  const [Username, setUsername] = useState(null);
  const [NPI, setNPI] = useState(null);
  const [Id_agence, setId_agence] = useState(null);


  return (
    <AuthContext.Provider value={{ Id_niveau, setId_niveau, Id_agence, setId_agence, Id_acteur, setId_acteur, Username, setUsername, NPI, setNPI }}>
      {children}
    </AuthContext.Provider>
  );
};
