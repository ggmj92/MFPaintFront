import React, { useEffect, useState } from "react";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "../firebase/firebase";
import NavBar from "./NavBar";
import Header from "./Header";

const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await getIdToken(user);
        setAuthUser(user);
        localStorage.setItem("firebaseToken", token);
        checkAdminStatus(user);
      } else {
        setAuthUser(null);
        setIsAdmin(false);
        localStorage.removeItem("firebaseToken");
      }
    });

    return () => {
      listen();
    };
  }, []);

  const checkAdminStatus = async (user) => {
    try {
      const idTokenResult = await user.getIdTokenResult();
      setIsAdmin(!!idTokenResult.claims.admin);
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  return { authUser, isAdmin };
};

const AuthStatus = () => {
  const { authUser, isAdmin } = useAuth();

  return (
    <>
      <NavBar authUser={authUser} auth={auth} />
      <Header authUser={authUser} isAdmin={isAdmin} />
    </>
  )
};

export default AuthStatus;


