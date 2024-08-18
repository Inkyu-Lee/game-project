import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 w-full bg-blue-600 p-4 shadow-lg z-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">게임 사이트</Link>
        </div>
        <div className="space-x-4">
          <Link
            to="/"
            onClick={() => navigate('/')}
            className="text-white hover:bg-blue-500 px-3 py-2 rounded-md"
          >
            Lotto
          </Link>
          <Link
            to="/rps"
            className="text-white hover:bg-blue-500 px-3 py-2 rounded-md"
          >
            RPS Game
          </Link>
          <Link
            to="/board"
            className="text-white hover:bg-blue-500 px-3 py-2 rounded-md"
          >
            Board
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
