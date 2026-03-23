import React, { useState } from 'react';
import { Zap, ArrowRight, Target, Globe, Award, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/atoms/BackButton';
import { valores, techStack, timeline, equipe } from '../data/SobrePageData';

const SobrePage = () => {
  const navigate = useNavigate();
  const [activeYear, setActiveYear] = useState(null);
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
      <main className="max-w-6xl mx-auto px-4 py-10">
        <BackButton />

        {/*  Cards Informativos Sobre a Empresa  */}
        <section className="mb-16">
          {/* Coluna de Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Missão */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <Target size={28} className="text-amber-500 mb-4" />
              <h3 className="text-lg font-extrabold text-slate-800 mb-2">Missão</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Democratizar o acesso à energia solar limpa e acessível para residências, comércios
                e indústrias em todo o Brasil.
              </p>
            </div>
            {/* Card 2: Visão */}
            <div className="bg-amber-500 rounded-3xl p-8 shadow-xl shadow-amber-200 text-white">
              <Globe size={28} className="text-white mb-4" />
              <h3 className="text-lg font-extrabold mb-2">Visão</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Ser a maior e mais confiável empresa de energia solar do Brasil até 2030, liderando
                a transição para uma economia de carbono zero.
              </p>
            </div>
            {/* Card 3: Propósito */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <Award size={28} className="text-amber-500 mb-4" />
              <h3 className="text-lg font-extrabold text-slate-800 mb-2">Propósito</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Cada painel instalado é um voto pelo futuro. Acreditamos que energia limpa não é
                luxo — é direito de todos.
              </p>
            </div>
          </div>
        </section>
        {/*  section nossos valores */}
        <section className="mb-16">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-8 text-center">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {/*Desestruturação const icon = Icon para Componente <Icon>
             { icon: Icon } é o mesmo que: const Icon = item.icon
            */}
            {valores.map(({ icon: Icon, titulo, desc }) => (
              //icon : Icon é uma destruturação que renomeia a propriedade "icon" para "Icon" para ser usada como um componente React. Assim, podemos renderizar o ícone dinamicamente usando <Icon /> no JSX.
              //icon:Icon é igual const Icon = icon.item para ser usado em componentes React. Assim, podemos renderizar o ícone dinamicamente usando <Icon /> no JSX.
              <div
                key={titulo}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:-translate-y-1 transition-all text-center"
              >
                <div className="bg-amber-50 rounded-xl p-3 inline-flex mb-4">
                  <Icon size={22} className="text-amber-500" />
                </div>
                <h4 className="font-extrabold text-slate-800 text-sm mb-2">{titulo}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Banner Produtos e Serviços da empresa */}
        <section className="mb-16 bg-slate-800 p-10 text-white relative overflow-hidden">
          {/* Bolas decorativas amarelas no banner */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          {/* Coluna divisão em 2 partes */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Tecnologia que a Empresa Oferece */}
            <div className="flex flex-col h-full">
              <h2 className="text-2xl font-extrabold mb-3">Tecnologia que usamos</h2>
              <p className="text-slate-400 text-sm mb-6 max-w-lg">
                Trabalhamos apenas com equipamentos certificados e fabricantes de classe mundial.
              </p>

              <div className="grid grid-cols-2 gap-4 flex-1">
                {/*Desestruturação const icon = Icon para Componente <Icon> */}
                {techStack.map(({ icon: Icon, label, desc, img }) => (
                  //icon : Icon é uma destruturação que renomeia a propriedade "icon" para "Icon" para ser usada como um componente React. Assim, podemos renderizar o ícone dinamicamente usando <Icon /> no JSX.
                  //icon:Icon é igual const Icon = icon.item para ser usado em componentes React. Assim, podemos renderizar o ícone dinamicamente usando <Icon /> no JSX.
                  <div
                    key={label}
                    className="relative bg-slate-700 rounded-2xl overflow-hidden flex flex-col min-h-40 group"
                  >
                    {/* Imagem de fundo */}
                    {img && (
                      <>
                        <img
                          src={img}
                          alt={label}
                          className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-45 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/40 to-transparent" />
                      </>
                    )}

                    {/* Conteúdo do card Dinâmico */}
                    <div className="relative z-10 flex flex-col justify-between h-full p-5 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-auto">
                        <Icon size={22} className="text-amber-400" />
                      </div>
                      <div className="mt-8">
                        <span className="text-sm font-extrabold text-white block leading-tight">
                          {label}
                        </span>
                        {/* Se tive Desconto */}
                        {desc && (
                          <p className="text-slate-400 text-[11px] mt-1 leading-snug">{desc}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Card de imagem */}
            <div className="relative rounded-2xl overflow-hidden h-72 md:h-full min-h-64 shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=800&q=80"
                alt="Painéis solares industriais"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

              {/* Badge flutuante — certificação */}
              <div className="absolute top-4 left-4 bg-amber-500 text-slate-900 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                Certificado INMETRO
              </div>

              {/* Stat flutuante — canto inferior */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-3">
                  <p className="text-amber-400 font-extrabold text-xl leading-none">+500</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">indústrias atendidas</p>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-3">
                  <p className="text-amber-400 font-extrabold text-xl leading-none">25 anos</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">de garantia nos painéis</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Seção Linha do Tempo */}
        <section className="mb-16">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2 text-center">
            Nossa Trajetória
          </h2>
          <p className="text-slate-500 text-sm text-center mb-10">
            12 anos construindo o futuro da energia no Brasil
          </p>

          <div className="relative">
            {/* Linha central */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />

            <div className="flex flex-col gap-6">
              {/* Lendo um array de objetos */}
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`flex gap-6 md:gap-0 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Vendo o resto se par e colocando uma condicional {i % 2 === 0 */}
                  <div
                    className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}
                  >
                    {' '}
                    {/* Defininado o ano  com condicional  */}
                    <button
                      onClick={() => setActiveYear(activeYear === i ? null : i)}
                      className={`inline-block bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all cursor-pointer text-left w-full max-w-sm ${activeYear === i ? 'border-amber-400 shadow-amber-100' : 'border-slate-100'}`}
                    >
                      <span className="text-amber-500 font-extrabold text-sm">{item.year}</span>
                      <h4 className="font-extrabold text-slate-800 mt-1 mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </button>
                  </div>

                  {/* Pontos laranja central */}
                  <div className="hidden md:flex w-0 items-center justify-center relative">
                    <div className="w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-md absolute" />
                  </div>
                  <div className="hidden md:block md:w-1/2" />

                  {/* Mobile  */}
                  <div className="md:hidden flex gap-4 items-start w-full">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {/* Pegando os 2 ultimos numeros do ano year: '2018', com o metodo slice vai cria um novo array com o valor de 18*/}
                        {item.year.slice(2)}
                      </div>
                      {/* separador visual entre os itens da linha do tempo, mas apenas até o penúltimo item.
                         i < timeline.length - 1: Verifica se o índice atual (i) é menor que o último índice do array

                        timeline.length - 1: Se temos 5 itens,
                        isso é 5 - 1 = 4 (último índice)

                        Renderiza o separador:
                        Apenas para índices 0, 1, 2, 3 (todos exceto o último)
                      */}
                      {i < timeline.length - 1 && (
                        <div className="w-0.5 bg-slate-200 flex-1 mt-2 h-8" />
                      )}
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex-1">
                      <span className="text-amber-500 font-extrabold text-sm">{item.year}</span>
                      <h4 className="font-extrabold text-slate-800 mt-1 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Section Funcionario da empresa */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <Users size={28} className="text-amber-500 mx-auto mb-3" />
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Quem faz acontecer</h2>
            <p className="text-slate-500 text-sm">Um time apaixonado por energia e pessoas</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Listando pessoas da equipe */}
            {equipe.map(({ nome, cargo, img }) => (
              <div
                key={nome}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center hover:-translate-y-1 transition-all"
              >
                <img
                  src={img}
                  alt={nome}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-amber-100"
                />
                <h4 className="font-extrabold text-slate-800 text-sm">{nome}</h4>
                <p className="text-slate-500 text-xs mt-1">{cargo}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* Seção entra em Contato */}
      <section className="bg-amber-500  p-10 text-center text-white shadow-xl shadow-amber-200">
        <Zap size={32} className="mx-auto mb-4" />
        <h2 className="text-2xl font-extrabold mb-3">Faça parte dessa história</h2>
        <p className="text-white/80 mb-6 text-sm max-w-md mx-auto">
          Junte-se a mais de 1.200 famílias e empresas que já escolheram a energia do futuro.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/contato')}
            className="bg-white text-amber-500 font-bold px-8 py-3 rounded-xl hover:bg-amber-50 transition-all inline-flex items-center justify-center gap-2"
          >
            Solicitar Proposta <ArrowRight size={15} />
          </button>
          <button
            onClick={() => navigate('/servicos')}
            className="bg-amber-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-amber-700 transition-all"
          >
            Ver Serviços
          </button>
        </div>
      </section>
    </div>
  );
};

export default SobrePage;
