import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/organisms/Header';
import HomePage from './pages/HomePage';
import ContatoPage from './pages/Contatopage';
import Footer from './components/organisms/Footer';
import ServicosPage from './pages/ServicosPage';
import FaqPage from './pages/FaqPage';
import SobrePage from './pages/SobrePage';
import SuportePage from './pages/SuportePage';
import CarreiraPage from './pages/CarreiraPage';
import { FormProvider, useFormContext } from './context/FormContext';
function TestComponent() {
  const { forms, updateField, resetForm } = useFormContext();

  return (
    // Componente de teste para verificar se o contexto funciona
    <div>
      <h2>Teste Formulário</h2>

      <input
        placeholder="Nome"
        value={forms.contato.nome}
        onChange={(e) => updateField('contato', 'nome', e.target.value)}
      />
      <input
        placeholder="Email"
        value={forms.contato.email}
        onChange={(e) => updateField('contato', 'email', e.target.value)}
      />
      <p>Nome digitado: {forms.contato.nome}</p>
      <p>Email digitado: {forms.contato.email}</p>

      <button onClick={() => resetForm('contato')}>Resetar</button>
    </div>
  );
}

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white-50 flex flex-col">
          <Header />
          {/* Componente de teste para verificar se o contexto funciona */}
          <TestComponent />

          <main className=" w-full  mx-auto flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/contato" element={<ContatoPage />} />
              <Route path="/servicos" element={<ServicosPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/sobre" element={<SobrePage />} />
              <Route path="/suporte" element={<SuportePage />} />
              <Route path="/carreira" element={<CarreiraPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </FormProvider>
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
