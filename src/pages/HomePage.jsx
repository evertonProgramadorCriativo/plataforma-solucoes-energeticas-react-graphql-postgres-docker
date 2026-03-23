import React, { useState, useEffect } from 'react';
import FormularioCalculo from '../components/organisms/FormularioCalculo';

// BannerCarousel -> estrutura base: estado e efeito declarados, sem JSX ainda
function BannerCarousel() {
  const [current, setCurrent] = useState(0); // índice do banner ativo
  const [paused, setPaused] = useState(false); // pausa o autoplay no hover

  useEffect(() => {
    console.log('BannerCarousel montado — current:', current);
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
      <p>BannerCarousel — índice atual: {current}</p>
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
