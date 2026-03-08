import React from 'react';
import { Zap } from 'lucide-react';
const SobrePage = () => {
  return (
    <div className="bg-slate-50">
      {/* Header  */}
      <header className="bg-slate-800 min-h-[400px] text-white relative overflow-hidden">
        {/* Bolas decorativas amarelas */}
        <div className="absolute inset-0 opacity-10">
          {/* Bola 1 - está à direita no topo do header */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full -translate-y-1/2 translate-x-1/2" />
          {/* Bola 2 - está à esquerda no fundo do header */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-4 uppercase tracking-widest">
              <Zap size={14} /> Sobre a Calarke Energia
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Transformando <span className="text-amber-400">luz solar</span> em liberdade
              energética
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Há mais de 12 anos conectamos brasileiros à energia do futuro. Mais de 1.200 projetos
              instalados, 15 MW de capacidade e um compromisso inabalável com o planeta.
            </p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default SobrePage;
