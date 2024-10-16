import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from "./contexts/AuthContext/AuthContext";
import { AuthInterceptor } from "./common/interceptors/AuthInterceptor";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
      <AuthContextProvider>
          <AuthInterceptor>
              <App />
          </AuthInterceptor>
      </AuthContextProvider>
  </React.StrictMode>
);