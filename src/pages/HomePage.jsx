import React, { useState, useEffect } from 'react';
import FormularioCalculo from '../components/organisms/FormularioCalculo';
import { ChevronLeft, ChevronRight, Truck } from 'lucide-react';
import { bannersData } from '../data/BannerCarouselData';
import { quickCards } from '../data/BannerCardsData';

// VISIBLE: quantos cards aparecem por vez na tela
// Com 10 cards e VISIBLE=6 -> maxOffset = 10-6 = 4 posições possíveis
const VISIBLE = 6;

function CardsCarousel() {
  // offset: índice do primeiro card visível
  // offset=0 -> cards 0..5 | offset=1 -> cards 1..6 | offset=4 -> cards 4..9
  const [offset, setOffset] = useState(0);
  const maxOffset = quickCards.length - VISIBLE; // 10 - 6 = 4

  // slice: pega só os 6 cards visíveis a partir do offset
  // 0 index , 0 + 6 index
  const visible = quickCards.slice(offset, offset + VISIBLE);

  // prev: volta 1 posição, mínimo 0 (não vai abaixo de 0)
  // setOffset((o) -> o
  //  Se offset = 2, então o = 2
  // o - 1 = 1 = novo valor -> 1
  // Se offset = 0, então:
  //  o - 1 = -1
  // Math.max(0, -1) = 0 (não deixa passar de 0)

  //Isso garante que o valor nunca fique negativo.

  function prev() {
    setOffset((o) => {
      // o = offset atual (valor anterior do estado  )
      // o - 1 = tenta voltar uma posição no carrossel
      // const newOffset = Math.max(0, o - 1);
      // Isso garante que o valor nunca fique negativo.
      const newOffset = Math.max(0, o - 1);
      console.log(`prev: ${o} → ${newOffset}`);
      return newOffset;
    });
  }

  // next: avança 1 posição, máximo maxOffset (não passa dos 10 cards)
  function next() {
    setOffset((o) => {
      const newOffset = Math.min(maxOffset, o + 1);
      console.log(`next: ${o} → ${newOffset}`);
      return newOffset;
    });
  }

  return (
    <div className="relative bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
      {/* botões temporários para testar a lógica */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button onClick={prev} disabled={offset === 0} style={{ padding: '4px 12px' }}>
          {'<-'} prev {offset === 0 ? '(desabilitado)' : ''}
        </button>
        <span style={{ color: '#64748b' }}>
          offset: {offset} / {maxOffset}
        </span>
        <button onClick={next} disabled={offset === maxOffset} style={{ padding: '4px 12px' }}>
          {'->'} next {offset === maxOffset ? '(desabilitado)' : ''}
        </button>
        {'botões temporários para testar a lógica'}
      </div>
      {/* grid de cards: 6 colunas iguais (repeat(6, minmax(0, 1fr))) */}
      <div
        className="grid transition-all duration-300"
        style={{ gridTemplateColumns: `repeat(${VISIBLE}, minmax(0, 1fr))` }}
      >
        {/* Mapeando os cards do array para renderizar na tela */}
        {visible.map((card, i) => (
          <div
            key={offset + i}
            className="flex flex-col items-center p-4 border-r border-slate-100 last:border-r-0 hover:bg-slate-50 transition-colors cursor-pointer group min-h-[260px]"
          >
            {/* label */}
            <p className="text-sm font-semibold text-slate-700 text-center mb-3 leading-tight">
              {card.label}
            </p>

            {/* imagem 96x96 com zoom no hover */}
            <div className="w-24 h-24 rounded-lg overflow-hidden mb-3 bg-slate-50 flex items-center justify-center">
              <img
                src={card.img}
                alt={card.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* descrição */}
            <p className="text-xs text-slate-500 text-center leading-relaxed flex-1 mb-2">
              {card.desc}
            </p>

            {/* preço -> renderiza só se existir (cards promocionais não têm preço) */}
            {card.price && <p className="text-sm font-bold text-slate-800 mb-1">{card.price}</p>}

            {/* tag -> renderiza só se existir, com emoji condicional */}
            {card.tag && (
              <p className={`text-xs font-semibold mb-2 ${card.tagColor}`}>
                {card.tag === 'Frete grátis' ? <Truck size={16} /> : ''}
                {card.tag}
              </p>
            )}

            {/* botão CTA */}
            <button
              className={`text-xs font-semibold border border-slate-200 rounded-full px-4 py-1.5 mt-auto hover:border-blue-400 transition-colors ${card.ctaColor}`}
            >
              {card.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// BannerCarousel -> estrutura base: estado e efeito declarados, sem JSX ainda
function BannerCarousel() {
  const [current, setCurrent] = useState(0); // índice do banner ativo
  const [paused, setPaused] = useState(false); // pausa o autoplay no hover
  const total = bannersData.length; // 5

  // Autoplay: avança o índice a cada 3500ms
  // Pausa quando o mouse entra no banner (onMouseEnter -> setPaused(true))
  // Retoma quando o mouse sai (onMouseLeave -> setPaused(false))
  // Dependências: [paused, current] -> reinicia o timer sempre que um desses muda

  // Confirmar no console que os dados foram carregados
  //console.log('Quick cards carregados:', quickCards.length); //-> 10
  //console.log('Cards com preço:', quickCards.filter((c) => c.price).length); //-> 7
  //console.log('Cards sem tag:', quickCards.filter((c) => !c.tag).length); //-> 3
  useEffect(() => {
    if (paused) {
      //console.log('Autoplay pausado');
      return; // sai sem criar o interval
    }
    //console.log('Autoplay rodando -> banner atual:', current);

    const t = setInterval(() => {
      setCurrent((p) => {
        // Exemplo
        // Quantas vezes o 5 cabe dentro do 3 sem quebrar?
        //  Resposta: nenhuma , sobra tudo -> 3

        // Quantas vezes o 5 cabe dentro do 5 sem quebrar?
        //  Resposta: 1 vez -> resto será 0 e voltara ao inicio
        // do carousel
        const next = (p + 1) % total; // volta ao 0 depois do último
        //console.log(`Avançando: ${p} -> ${next}`);
        return next;
      });
    }, 3500);

    return () => clearInterval(t); // limpa o interval ao desmontar ou re-executar
  }, [paused, current]);

  const bannerArray = bannersData[current]; // banner ativo
  // JSX temporário só para confirmar que o componente existe

  // Tema de cores baseado em textDark do banner ativo
  // textDark: true  -> banner claro (amber)  -> texto escuro
  // textDark: false -> banner escuro         -> texto branco
  const textColor = bannerArray.textDark ? 'text-slate-900' : 'text-white';
  const subColor = bannerArray.textDark ? 'text-slate-700' : 'text-white/80';
  const badgeStyle = bannerArray.textDark
    ? 'bg-white/60 text-slate-800 border border-slate-300'
    : 'bg-white/20 text-white border border-white/30';
  const tagStyle = bannerArray.textDark ? 'bg-black/10 text-slate-800' : 'bg-white/15 text-white';

  // No console: confirmar quais estilos estão sendo aplicados
  //console.log('Tema do banner:', { textDark: bannerArray.textDark, textColor, badgeStyle });

  return (
    <div
      className="relative w-full overflow-hidden h-[380px] md:h-[350px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/*
        Fundo com gradiente dinâmico:
        - key={current} força o React a recriar a div a cada troca de banner
        - bannerArray.bg vem do array: ex 'from-amber-400 to-amber-500'
        - transition-all duration-500 anima a troca de cor suavemente
      */}
      <div
        key={current}
        className={`absolute inset-0 bg-gradient-to-r ${bannerArray.bg} transition-all duration-500`}
      />

      {/*
        Imagem posicionada na metade direita do banner:
        - w-1/2 no mobile, w-2/5 no desktop (md:w-2/5)
        - opacity-40 mobile / opacity-60 desktop -> discreta para não disputar com o texto
        - maskImage: gradiente da direita para esquerda, criando fade suave
        - WebkitMaskImage: prefixo necessário para Safari
        - key={bannerArray.img} força reload da imagem ao trocar de banner
      */}
      <div className="absolute right-0 top-0 h-full w-1/2 md:w-2/5">
        <img
          key={bannerArray.img}
          src={bannerArray.img}
          alt={bannerArray.imgAlt}
          className="w-full h-full object-cover opacity-40 md:opacity-60"
          style={{
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 40%, transparent 100%)',
          }}
        />
      </div>

      {/* Coluna de conteúdo -> alinhada à esquerda, máx 512px */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 max-w-lg">
        {/*
          Badge: pílula com ponto colorido e texto do badge
          backdrop-blur-sm: leve desfoque atrás para legibilidade
        */}
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 backdrop-blur-sm ${badgeStyle}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 inline-block" />
          {bannerArray.badge}
        </span>

        {/*
          Título: fonte preta (font-black), letras maiúsculas
          whitespace-pre-line: respeita o '\n' no título para quebra de linha
          letterSpacing negativo: comprime as letras para visual impactante
        */}
        <h2
          className={`text-3xl md:text-4xl font-black leading-none mb-2 whitespace-pre-line ${textColor}`}
          style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.02em' }}
        >
          {bannerArray.title}
        </h2>

        {/* Subtítulo */}
        <p className={`text-sm mb-4 ${subColor}`}>{bannerArray.sub}</p>

        {/* Tag promocional: pílula pequena com emoji */}
        <p className={`text-xs mb-5 rounded-full px-3 py-1 w-fit ${tagStyle}`}>{bannerArray.tag}</p>

        {/*
          Botão CTA: cor invertida em relação ao fundo
          textDark=true (banner claro) -> botão escuro
          textDark=false (banner escuro) -> botão branco
        */}
        <button
          className={`flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-full w-fit transition-all hover:scale-105 ${
            bannerArray.textDark
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-white text-slate-900 hover:bg-white/90'
          }`}
        >
          {bannerArray.cta}
        </button>
      </div>
      {/*
        Seta esquerda: volta ao banner anterior
        Cálculo: (current - 1 + total) % total
        Exemplo com total=5:
          current=0 -> (0 - 1 + 5) % 5 = 4  (volta ao último)
          current=2 -> (2 - 1 + 5) % 5 = 1  (volta ao anterior)
        O +total evita índice negativo
      */}
      <button
        onClick={() => {
          const prev = (current - 1 + total) % total;
          //console.log(`Seta esquerda: ${current} -> ${prev}`);
          setCurrent(prev);
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all z-20"
      >
        <ChevronLeft size={16} />
      </button>

      {/*
        Seta direita: avança ao próximo banner
        Cálculo: (current + 1) % total
        Exemplo com total=5:
          current=4 -> (4 + 1) % 5 = 0  (volta ao primeiro)
          current=1 -> (1 + 1) % 5 = 2  (avança)
      */}
      <button
        onClick={() => {
          const next = (current + 1) % total;
          // console.log(`Seta direita: ${current} -> ${next}`);
          setCurrent(next);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all z-20"
      >
        <ChevronRight size={16} />
      </button>

      {/*
        Dots de navegação centralizados na base:
        - map gera um botão por banner (5 total)
        - banner ativo: dot largo (w-5 h-2) branco
        - banner inativo: dot redondo (w-2 h-2) branco translúcido
        - onClick: navega diretamente para o índice clicado
        - transition-all duration-300: anima a mudança de forma do dot
      */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
        {bannersData.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              // console.log(`Dot clicado: indo para banner ${i}`);
              setCurrent(i);
            }}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-5 h-2 bg-white' // ativo: pílula branca larga
                : 'w-2 h-2 bg-white/40 hover:bg-white/70' // inativo: bolinha translúcida
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const HomePage = () => {
  return (
    <div>
      {/* Banner */}
      <BannerCarousel />
      {/*Cards 6 Banner*/}
      <CardsCarousel />

      {/* Calculadora */}
      <FormularioCalculo />
    </div>
  );
};

export default HomePage;
