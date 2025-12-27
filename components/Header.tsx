
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded-lg">
              <i className="fa-solid fa-microphone-lines text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              ScriptRefine<span className="text-red-600">Pro</span>
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">Features</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">Pricing</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">Help</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900">Sign in</button>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
