import React from 'react';
import BackButton from '../components/atoms/BackButton';
import { Zap } from 'lucide-react';
import { statServiceArray } from '../data/ServicosPageData';
import { serviceDetails } from '../data/ServicosPageData';
import { Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const ServicosPage = () => {
  const navigate = useNavigate(); // Hook para navegação programática
  return (
    <div className="w-full bg-slate-100">
      <div className="max-w-6xl   mx-auto px-4 py-10">
        <BackButton />
        {/* Header */}
        <section className="text-center mb-14">
          <div className="flex justify-center mb-5">
            <div className="bg-amber-500 rounded-2xl p-4 shadow-lg shadow-amber-200">
              <Zap size={36} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Nossos Serviços</h1>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            Soluções completas em energia solar para residências, comércios e indústrias. Do projeto
            à manutenção, cuidamos de tudo.
          </p>
        </section>
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {statServiceArray.map(({ value, label }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-100"
            >
              <div className="text-2xl font-extrabold text-amber-500 mb-1">{value}</div>
              <div className="text-xs text-slate-500 font-medium">{label}</div>
            </div>
          ))}
        </section>
        {/* Serviços Grid */}
        <section className="grid  md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {serviceDetails.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.titulo}
                className={`rounded-3xl p-6 flex flex-col border transition-all hover:-translate-y-1 hover:shadow-lg
                ${
                  s.destaque
                    ? 'bg-amber-500 border-amber-400 text-white shadow-xl shadow-amber-200'
                    : 'bg-white border-slate-100 text-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`rounded-xl p-2.5 ${s.destaque ? 'bg-white/20' : 'bg-amber-50'}`}>
                    <Icon size={22} className={s.destaque ? 'text-white' : 'text-amber-500'} />
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.destaque ? 'bg-white/20 text-white' : s.tagColor}`}
                  >
                    {s.tag}
                  </span>
                </div>

                <h3
                  className={`text-lg font-extrabold mb-2 ${s.destaque ? 'text-white' : 'text-slate-800'}`}
                >
                  {s.titulo}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-4 flex-1 ${s.destaque ? 'text-white/80' : 'text-slate-500'}`}
                >
                  {s.descricao}
                </p>

                <ul className="space-y-1.5 mb-5">
                  {s.beneficios.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs">
                      <Star
                        size={12}
                        className={s.destaque ? 'text-white/70' : 'text-amber-400'}
                        fill="currentColor"
                      />
                      <span className={s.destaque ? 'text-white/90' : 'text-slate-600'}>{b}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`text-sm font-bold mb-4 ${s.destaque ? 'text-white' : 'text-slate-800'}`}
                >
                  {s.preco}
                </div>

                <button
                  onClick={() => navigate('/contato')}
                  className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all
                  ${
                    s.destaque
                      ? 'bg-white text-amber-500 hover:bg-amber-50'
                      : 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm'
                  }`}
                >
                  Solicitar Proposta <ArrowRight size={15} />
                </button>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default ServicosPage;
