import React from 'react';
import { Keyboard } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 bg-opacity-70 backdrop-blur-md border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Keyboard className="text-cyan-400" size={28} />
            <span className="font-bold text-xl">TypeMaster</span>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;