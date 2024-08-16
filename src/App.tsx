import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Article from './Pages/Article';
import Board from './Pages/Board';
import LottoPage from './Pages/LottoPage';
import RpsGamePage from './Pages/RpsGamePage';

const App:React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <NavBar/>
    <Routes>
      <Route path="/article/:articleId" element={<Article/>} />
      <Route path="/" element={<LottoPage />} />
      <Route path="/rps" element={<RpsGamePage />} />
      <Route path="/board" element={<Board />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App