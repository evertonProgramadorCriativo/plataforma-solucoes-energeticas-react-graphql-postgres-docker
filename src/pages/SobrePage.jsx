import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const SobrePage = () => {
  const navigate = useNavigate();
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
            {/* Título principal com destaque para "luz solar" em amarelo */}
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Transformando <span className="text-amber-400">luz solar</span> em liberdade
              energética
            </h1>
            {/* Parágrafo de descrição */}
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Há mais de 12 anos conectamos brasileiros à energia do futuro. Mais de 1.200 projetos
              instalados, 15 MW de capacidade e um compromisso inabalável com o planeta.
            </p>
            {/* Botão "Fale com a gente" */}
            <button
              onClick={() => navigate('/contato')}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Fale com a gente <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default SobrePage;
