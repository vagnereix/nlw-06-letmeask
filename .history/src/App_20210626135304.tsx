import { BrowserRouter, Route } from "react-router-dom";

import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";

import "./styles/auth.scss";
import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { auth } from "./services/firebase";
import { AuthContext } from "./contexts/AuthContext";

export function App() {
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <BrowserRouter>
        
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        
    </BrowserRouter>
  );
}
