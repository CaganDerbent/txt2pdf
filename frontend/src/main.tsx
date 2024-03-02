import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

const ID = import.meta.env.VITE_ID;

const RootComponent: React.FC = () => (
  <React.StrictMode>
    <GoogleOAuthProvider clientId={ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RootComponent />
);