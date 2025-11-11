import React from 'react';
import './App.scss';
import './styles/_common.scss';
import './styles/_mixins.scss';
import './styles/_function.scss';
import './styles/_variables.scss';
import './styles/main.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppRoutes from './routes/appRoutes';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './utils/UseContext/useContext';

function App() {
  return (
    <>
    <ToastContainer />
      <UserProvider>
      <AppRoutes />
      </UserProvider>
        
    </>
  );
}

export default App;
