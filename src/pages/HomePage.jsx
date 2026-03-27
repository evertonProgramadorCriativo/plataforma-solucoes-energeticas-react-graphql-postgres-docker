import React, { useState, useEffect } from 'react';
import FormularioCalculo from '../components/organisms/FormularioCalculo';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bannersData } from '../data/BannerCarouselData';
import { quickCards } from '../data/BannerCardsData';

// BannerCarousel -> estrutura base: estado e efeito declarados, sem JSX ainda
function BannerCarousel() {
  const [current, setCurrent] = useState(0); // índice do banner ativo
  const [paused, setPaused] = useState(false); // pausa o autoplay no hover
  const total = bannersData.length; // 5

  // Autoplay: avança o índice a cada 3500ms
  // Pausa quando o mouse entra no banner (onMouseEnter -> setPaused(true))
  // Retoma quando o mouse sai (onMouseLeave -> setPaused(false))
  // Dependências: [paused, current] — reinicia o timer sempre que um desses muda

  // Confirmar no console que os dados foram carregados
  console.log('Quick cards carregados:', quickCards.length); //-> 10
  console.log('Cards com preço:', quickCards.filter((c) => c.price).length); //-> 7
  console.log('Cards sem tag:', quickCards.filter((c) => !c.tag).length); //-> 3
  useEffect(() => {
    if (paused) {
      //console.log('Autoplay pausado');
      return; // sai sem criar o interval
    }
    //console.log('Autoplay rodando — banner atual:', current);

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
        - opacity-40 mobile / opacity-60 desktop — discreta para não disputar com o texto
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

      {/* Coluna de conteúdo — alinhada à esquerda, máx 512px */}
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
      {/* Calculadora */}
      <FormularioCalculo />
    </div>
  );
};

export default HomePage;
