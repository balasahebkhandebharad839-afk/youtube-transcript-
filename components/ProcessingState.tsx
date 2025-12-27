
import React from 'react';

interface ProcessingStateProps {
  isProcessing: boolean;
}

const ProcessingState: React.FC<ProcessingStateProps> = ({ isProcessing }) => {
  if (!isProcessing) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-red-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fa-solid fa-bolt text-red-600 text-2xl animate-pulse"></i>
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Polishing Your Script</h3>
        <p className="text-slate-500 text-sm">
          Gemini is removing filler words, fixing grammar, and optimizing for SEO...
        </p>
      </div>
    </div>
  );
};

export default ProcessingState;
