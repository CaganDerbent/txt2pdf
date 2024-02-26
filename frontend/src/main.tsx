import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

const RootComponent: React.FC = () => (
  <React.StrictMode>
    <GoogleOAuthProvider clientId='791865313889-lo8e4pegujjfmqvhh2b7irgacq7gu21a.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RootComponent />
);