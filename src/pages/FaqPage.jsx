import React, { useState } from 'react';
import { HelpCircle, Search } from 'lucide-react';
import BackButton from '../components/atoms/BackButton';
import { categorias } from '../data/FaqPageData';
const FaqPage = () => {
  const [busca, setBusca] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  return (
    <div className="bg-slate-50 min-h-[100vh]">
      {/*  Header */}
      <header className="bg-slate-800 min-h-[520px] text-white py-14 relative overflow-hidden">
        {/*  Bola no Canto Superior */}
        <div className="absolute inset-0 min-h-52 opacity-10 ">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400 rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
        {/* Cabeçalho com título, descrição e ícone de ajuda na FAQ */}
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="bg-amber-500 rounded-2xl p-4 inline-flex mb-5 shadow-lg shadow-amber-900/30">
            <HelpCircle size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold mb-4">Perguntas Frequentes</h1>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto leading-relaxed">
            Encontre respostas rápidas sobre energia solar, instalação, financiamento e muito mais.
          </p>
          {/* Barra de busca */}
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquise sua dúvida..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-slate-800 text-sm outline-none border-2 border-transparent focus:border-amber-400 shadow-lg"
            />
          </div>
        </div>
      </header>
      <section className="max-w-4xl mx-auto  px-4 py-10">
        <BackButton />
        {/*  CATEGORIAS  */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categorias.map(({ label, icon: Icon }) => (
            // Icon = const icon = HelpCircle, DollarSign, Wrench, Building2, Leaf, ShieldCheck
            //const Icon = icon; <Icon size={14} />
            <button
              key={label}
              onClick={() => {
                // Ao clicar em uma categoria, a função onClick é chamada, que define a categoria ativa usando setCategoriaAtiva(label) e fecha o dropdown definindo setOpenIndex(null). Por exemplo, se o usuário clicar na categoria "Financeiro", a função onClick será executada, definindo a categoria ativa como "Financeiro" e fechando o dropdown.
                //label: 'Financeiro', icon: DollarSign -> setCategoriaAtiva('Financeiro') e Icon = DollarSign
                setCategoriaAtiva(label);
                setOpenIndex(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                categoriaAtiva === label
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
