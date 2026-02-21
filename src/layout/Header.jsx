import React, { useState } from 'react';
import { Zap, ChevronDown, LogIn, LogOut, Mail, Briefcase } from 'lucide-react';

const Header = () => {

  return (
    <header className="bg-slate-800 text-white py-4 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Zap size={32} className="text-amber-400" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Calarke Energia</h1>
              <p className="text-slate-300 text-sm hidden md:block">
                Calcule sua economia com energia sustentável
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;