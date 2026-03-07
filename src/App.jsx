import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/organisms/Header';
import HomePage from './pages/HomePage';
import ContatoPage from './pages/Contatopage';
import Footer from './components/organisms/Footer';
import ServicosPage from './pages/ServicosPage';
import FaqPage from './pages/FaqPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white-50 flex flex-col">
        <Header />
        <main className=" w-full  mx-auto flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/contato" element={<ContatoPage />} />
            <Route path="/servicos" element={<ServicosPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

/**const [estadoSelecionado, setEstadoSelecionado] = useState('RJ');
const estadoData = estadosData.find((e) => e.uf === estadoSelecionado);
console.log('Estado selecionado:', estadoData);

 * Ao selecionar "RJ" no dropdown, o console exibirá:
 * { uf: 'RJ', nome: 'Rio de Janeiro', tarifaBaseKwh: 0.789 }
 */

/**
const [consumoMensal, setConsumoMensal] = useState('20');
const [estadoSelecionado, setEstadoSelecionado] = useState('RJ');
const podeCadcular = estadoSelecionado !== '' && consumoMensal !== '' && Number(consumoMensal) > 0;
console.log('Pode calcular:', podeCadcular);

// Resultado do console: Pode calcular: false*/
