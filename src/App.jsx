import React, { useState } from 'react';
import Header from './components/organisms/Header';
import FormularioCalculo from './components/organisms/FormularioCalculo';
import { estadosData } from './data/estadosData';

function App() {



  const [estadoSelecionado, setEstadoSelecionado] = useState('RJ');
  const estadoData = estadosData.find((e) => e.uf === estadoSelecionado);
  console.log('Estado selecionado:', estadoData);
  /**
   * Ao selecionar "RJ" no dropdown, o console exibirá:
   * { uf: 'RJ', nome: 'Rio de Janeiro', tarifaBaseKwh: 0.789 }
   */
  return (
    <div className="min-h-screen bg-cyan-400 flex flex-col">
      <Header />
      <main className=" w-full mx-auto flex-1">
        <FormularioCalculo
          estadoSelecionado={estadoSelecionado}
          setEstadoSelecionado={setEstadoSelecionado} />

      </main>
    </div>
  );
}

export default App;