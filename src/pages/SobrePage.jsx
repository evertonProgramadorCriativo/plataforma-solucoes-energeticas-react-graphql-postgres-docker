import React from 'react';

const SobrePage = () => {
  return (
    <div className="bg-slate-50">
      {/* Header  */}
      <header className="bg-slate-800 min-h-[400px] text-white relative overflow-hidden">
        {/* Bolas decorativas amarelas */}
        <div className="absolute inset-0 opacity-10">
          {/* Bola 1 - está à direita no topo do header */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
      </header>
    </div>
  );
};

export default SobrePage;
