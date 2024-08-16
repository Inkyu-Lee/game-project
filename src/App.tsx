import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import LottoPage from './Pages/LottoPage';
import RpsGamePage from './Pages/RpsGamePage';

const App:React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <NavBar/>
    <Routes>
      <Route path="/" element={<LottoPage />} />
      <Route path="/rps" element={<RpsGamePage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App