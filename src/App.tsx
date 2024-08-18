import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import RoutesPage from './Routes/RoutesPage';

const App:React.FC = () => {

  return (
      <Router basename={process.env.PUBLIC_URL}>
        <NavBar/>
        <RoutesPage />
      </Router>
  )
}

export default App