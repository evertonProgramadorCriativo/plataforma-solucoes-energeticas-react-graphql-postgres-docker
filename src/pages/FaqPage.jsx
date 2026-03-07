import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import BackButton from '../components/atoms/BackButton';
import { categorias } from '../data/FaqPageData';
import { faqs } from '../data/FaqPageData';
import { useNavigate } from 'react-router-dom';
const FaqPage = () => {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  /*
Veja como o fluxo funciona na prática:
 Usuário clica em "Financeiro"
O evento dispara setCategoriaAtiva('Financeiro'), atualizando o estado do componente.
 React re-renderiza automaticamente
Sempre que um estado muda, o React recalcula o componente — sem precisar recarregar a página.
 O filter() entra em ação
faqs.filter() roda novamente comparando 'Financeiro' === f.categoria para cada item da lista.
 Apenas os FAQs da categoria passam
Dos 13 itens totais, somente os 3 da categoria "Financeiro" retornam.
 A lista atualiza na tela
O usuário vê instantaneamente apenas o conteúdo relevante.

O que aprendi com isso: a combinação de useState + .filter() é uma das formas mais simples e poderosas de criar interfaces reativas. Sem bibliotecas extras, sem complexidade desnecessária.
#React #JavaScript #Frontend #WebDevelopment

  */
  const faqsFiltrados = faqs.filter((f) => {
    // se for 'Todas' -> passa tudo
    // senão -> compara ex: 'Financeiro' === 'Financeiro'
    // O operador lógico || é usado para permitir que a categoria "Todas" exiba todos os FAQs, independentemente de sua categoria específica. Se categoriaAtiva for "Todas", matchCategoria será true para todos os itens, permitindo que todos os FAQs sejam exibidos. Caso contrário, matchCategoria só será true para os FAQs cuja categoria corresponda exatamente à categoriaAtiva selecionada.
    const matchCategoria = categoriaAtiva === 'Todas' || f.categoria === categoriaAtiva;
    console.log('achando categoria por clique: ' + matchCategoria);
    const matchBusca =
      busca === '' ||
      // O método toLowerCase() é usado para converter tanto a pergunta (f.q) quanto a resposta (f.a) para letras minúsculas, garantindo que a busca seja case-insensitive. O método includes() verifica se a string de busca (também convertida para minúsculas) está presente em qualquer parte da pergunta ou resposta. Se a string de busca for encontrada em pelo menos um desses campos, matchBusca será true, permitindo que o FAQ seja incluído nos resultados filtrados.
      f.q.toLowerCase().includes(busca.toLowerCase()) ||
      f.a.toLowerCase().includes(busca.toLowerCase());

    return matchCategoria && matchBusca;
  });

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

          {/*  LISTA DE FAQs  */}
          {/* traz todas categorias ou a Selecionada */}
          {faqsFiltrados.length === 0 ? (
            <div className="text-center py-20">
              <Search size={40} className="text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-semibold">Nenhuma pergunta encontrada.</p>
              <p className="text-slate-400 text-sm mt-1">
                Tente outros termos ou entre em contato conosco.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mb-14">
              {faqsFiltrados.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all ${
                      isOpen ? 'border-amber-400 shadow-amber-100' : 'border-slate-100'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="bg-amber-50 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5">
                          {faq.categoria}
                        </span>
                        <span className="font-bold text-slate-800 text-sm">{faq.q}</span>
                      </div>
                      {isOpen ? (
                        <ChevronUp size={18} className="text-amber-500 shrink-0" />
                      ) : (
                        <ChevronDown size={18} className="text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-6 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <section className="bg-amber-500  p-10 text-white text-center shadow-xl shadow-amber-200">
        <HelpCircle size={32} className="mx-auto mb-4" />
        <h2 className="text-xl font-extrabold mb-2">Ainda tem dúvidas?</h2>
        <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
          Nossa equipe de especialistas está pronta para responder qualquer pergunta e montar uma
          proposta personalizada.
        </p>
        <button
          onClick={() => navigate('/contato')}
          className="bg-white text-amber-500 font-bold px-8 py-3 rounded-xl hover:bg-amber-50 transition-all inline-flex items-center gap-2"
        >
          Falar com Especialista <ArrowRight size={15} />
        </button>
      </section>
    </div>
  );
};

export default FaqPage;
