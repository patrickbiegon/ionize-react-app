import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from './providers/UserProvider';
import { useHistory } from 'react-router-dom';
import { auth } from './services/firebase';

export default function Dashboard() {
  const user = useContext(UserContext);
  let history = useHistory();
  const [redirect, setredirect] = useState(null);

  const logout = () => {
    auth
      .signOut()
      .then(() => {
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (!user) {
      setredirect('/');
    }
  }, [user]);
  if (redirect) {
    history.push(redirect);
  }
  return (
    <div className="dashboard">
      <h1 className="dashboard-text">Welcome Home</h1>
      <button
        type="button"
        className="btn btn-info mt-"
        onClick={() => logout()}>
        Log out
      </button>
    </div>
  );
}
