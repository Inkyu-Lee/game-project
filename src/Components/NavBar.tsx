import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">게임 사이트</Link>
        </div>
        <div className="space-x-4">
          <Link
            to="/"
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
