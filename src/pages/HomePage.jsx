import React, { useState, useEffect } from 'react';
import FormularioCalculo from '../components/organisms/FormularioCalculo';
import { bannersData } from '../data/BannerCarouselData';

// BannerCarousel -> estrutura base: estado e efeito declarados, sem JSX ainda
function BannerCarousel() {
  const [current, setCurrent] = useState(0); // índice do banner ativo
  const [paused, setPaused] = useState(false); // pausa o autoplay no hover
  const total = bannersData.length; // 5

  // Autoplay: avança o índice a cada 3500ms
  // Pausa quando o mouse entra no banner (onMouseEnter -> setPaused(true))
  // Retoma quando o mouse sai (onMouseLeave -> setPaused(false))
  // Dependências: [paused, current] — reinicia o timer sempre que um desses muda
  useEffect(() => {
    if (paused) {
      console.log('Autoplay pausado');
      return; // sai sem criar o interval
    }
    console.log('Autoplay rodando — banner atual:', current);

    const t = setInterval(() => {
      setCurrent((p) => {
        // Exemplo
        // Quantas vezes o 5 cabe dentro do 3 sem quebrar?
        //  Resposta: nenhuma , sobra tudo -> 3

        // Quantas vezes o 5 cabe dentro do 5 sem quebrar?
        //  Resposta: 1 vez -> resto será 0 e voltara ao inicio
        // do carousel
        const next = (p + 1) % total; // volta ao 0 depois do último
        console.log(`Avançando: ${p} -> ${next}`);
        return next;
      });
    }, 3500);

    return () => clearInterval(t); // limpa o interval ao desmontar ou re-executar
  }, [paused, current]);

  const b = bannersData[current]; // banner ativo
  // JSX temporário só para confirmar que o componente existe
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 280 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/*
        Fundo com gradiente dinâmico:
        - key={current} força o React a recriar a div a cada troca de banner
        - b.bg vem do array: ex 'from-amber-400 to-amber-500'
        - transition-all duration-500 anima a troca de cor suavemente
      */}
      <div
        key={current}
        className={`absolute inset-0 bg-gradient-to-r ${b.bg} transition-all duration-500`}
      />

      {/*
        Imagem posicionada na metade direita do banner:
        - w-1/2 no mobile, w-2/5 no desktop (md:w-2/5)
        - opacity-40 mobile / opacity-60 desktop — discreta para não disputar com o texto
        - maskImage: gradiente da direita para esquerda, criando fade suave
        - WebkitMaskImage: prefixo necessário para Safari
        - key={b.img} força reload da imagem ao trocar de banner
      */}
      <div className="absolute right-0 top-0 h-full w-1/2 md:w-2/5">
        <img
          key={b.img}
          src={b.img}
          alt={b.imgAlt}
          className="w-full h-full object-cover opacity-40 md:opacity-60"
          style={{
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 40%, transparent 100%)',
          }}
        />
      </div>

      {/* conteúdo temporário */}
      <div className="relative z-10 h-full flex items-center px-8">
        {/*/badge =  rótulo, etiqueta ou selo */}
        <p className="text-white font-bold">{b.badge}</p>
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
