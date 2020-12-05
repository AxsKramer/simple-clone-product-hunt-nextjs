import React, {useEffect, useState} from 'react';
import firebase from '../firebase';

const useAuth = () => {
  const [userAuthenticated, setUserAuth] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      user ? setUserAuth(user) : setUserAuth(null);
    });
    return () => unsubscribe();
  }, []);

  return userAuthenticated;
}

export default useAuth;