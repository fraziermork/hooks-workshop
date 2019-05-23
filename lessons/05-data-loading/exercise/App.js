import React, { useState, useEffect } from 'react'

import { onAuthStateChanged } from 'app/utils'
import LoggedIn from 'app/LoggedIn'
import LoggedOut from 'app/LoggedOut'


function useAuth() {
  const [responseReceived, setResponseReceived] = useState(false);
  const [auth, setAuth] = useState(null);

  useEffect(() => onAuthStateChanged((newAuth) => {
    setResponseReceived(true);
    setAuth(newAuth)
  }), []);

  return [
    responseReceived,
    auth,
  ];
}

export default function App() {
  const [authAttempted, auth] = useAuth();

  if (!authAttempted) {
    return <p>Authenticating...</p>
  }

  return (
    <div className="Layout">
      {auth ? <LoggedIn auth={auth} /> : <LoggedOut />}
    </div>
  )
}
