import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 bg-opacity-70 backdrop-blur-md border-t border-gray-700 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-gray-400 text-sm">
              © 2025 TypeMaster. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Made by Saad Asif
            </p>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/Saad-Asiif" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/saad-asiif/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:saad.asif0995@gmail.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;