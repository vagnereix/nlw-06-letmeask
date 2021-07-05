import { BrowserRouter, Route } from "react-router-dom";

import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";

import "./styles/auth.scss";
import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { auth } from "./services/firebase";
import { AuthContextProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <BrowserRouter>
        <AuthContextProvider>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </AuthContextProvider>
    </BrowserRouter>
  );
}
