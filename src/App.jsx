import React from 'react';
import 'firebase/storage';
import Footer from './components/Footer';
import { AppRoutes } from './routes/routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthStatus from './components/AuthStatus';

function App() {
  return (
    <div>
      <AuthStatus />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;