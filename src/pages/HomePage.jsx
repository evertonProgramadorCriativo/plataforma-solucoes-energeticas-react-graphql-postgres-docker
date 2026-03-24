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
      <div
        style={{
          background: '#94a3b8',
          height: 280,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={() => setPaused(true)} // pausa no hover
        onMouseLeave={() => setPaused(false)} // retoma ao sair
      >
        <p style={{ color: 'white', fontSize: 18 }}>
          Banner {current + 1} de {total} — {paused ? ' pausado' : 'rodando'}
        </p>
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
