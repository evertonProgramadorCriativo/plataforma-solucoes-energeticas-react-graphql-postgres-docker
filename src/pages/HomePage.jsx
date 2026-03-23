import React, { useState, useEffect } from 'react';
import FormularioCalculo from '../components/organisms/FormularioCalculo';
import { bannersData } from '../data/BannerCarouselData';

// BannerCarousel -> estrutura base: estado e efeito declarados, sem JSX ainda
function BannerCarousel() {
  const [current, setCurrent] = useState(0); // índice do banner ativo
  const [paused, setPaused] = useState(false); // pausa o autoplay no hover
  const total = bannersData.length; // 5

  useEffect(() => {
    // Confirma que o array está carregado e o total está correto
    console.log('Total de banners:', total);
    console.log('Banner atual:', bannersData[current]);
  }, [current]);

  // JSX temporário só para confirmar que o componente existe
  return (
    <div
      style={{
        background: '#ccc',
        height: 280,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p>
        BannerCarousel — total: {total} | índice: {current} | Título dos banners :{' '}
        {bannersData[current].badge}
      </p>
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
