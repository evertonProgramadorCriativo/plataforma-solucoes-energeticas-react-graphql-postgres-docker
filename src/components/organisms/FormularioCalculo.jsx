import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { estadosData } from '../../data/estadosData';
import SeletorEstado from '../molecules/SeletorEstado';
import InputConsumo from '../molecules/InputConsumo';
import BotoesCalculoEnergia from '../molecules/BotoesCalculoEnergia';
import { MapPin, Zap, DollarSign, TrendingUp, Award, Sun, Leaf } from 'lucide-react';

const FormularioCalculo = () => {
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [consumoMensal, setConsumoMensal] = useState('');
  const [resultado, setResultado] = useState(null);
  const [calculando, setCalculando] = useState(false);

  const estadoData = estadosData.find((e) => e.uf === estadoSelecionado);
  const podeCadcular =
    estadoSelecionado !== '' && consumoMensal !== '' && Number(consumoMensal) > 0;

  const handleCalcular = () => {
    if (!podeCadcular) return;

    setCalculando(true);
    /**
         *export const estadosData = [
           { uf: 'SP', nome: 'São Paulo', tarifaBaseKwh: 0.656 },
           { uf: 'RJ', nome: 'Rio de Janeiro', tarifaBaseKwh: 0.789 },
           { uf: 'MG', nome: 'Minas Gerais', tarifaBaseKwh: 0.612 },
           { uf: 'ES', nome: 'Espírito Santo', tarifaBaseKwh: 0.701 },
           { uf: 'PR', nome: 'Paraná', tarifaBaseKwh: 0.598 },
       ];

         */
    // Simula um pequeno delay para demonstrar o estado de loading
    setTimeout(() => {
      const tarifa = estadoData.tarifaBaseKwh; //RJ = 0.789
      const consumo = Number(consumoMensal); // Ex: 500 kWh
      const custoAtual = consumo * tarifa;
      // Ex: 500 kWh * R$ 0.789/kWh = R$ 394.50
      const desconto = 0.15; // 15% de economia estimada
      const economia = custoAtual * desconto;
      // Ex: R$ 394.50 * 15% = R$ 59.18
      const custoComEnergiaSolar = custoAtual - economia;
      // Ex: R$ 394.50 - R$ 59.18 = R$ 335.32

      setResultado({
        estado: estadoData.nome,
        consumo,
        tarifa,
        custoAtual: custoAtual.toFixed(2),
        economia: economia.toFixed(2),
        custoComEnergiaSolar: custoComEnergiaSolar.toFixed(2),
      });
      /* { estado: "Rio de Janeiro",
                consumo: 500,
                tarifa: 0.789,
                custoAtual: 394.50,
                economia: 59.18,
                custoComEnergiaSolar: 335.32 }*/

      //setCalculando(false) é chamado após a simulação para indicar que o processo de cálculo foi concluído, permitindo que o usuário veja os resultados e interaja com o formulário novamente.
      setCalculando(false);
    }, 800);
  };
  // handleResetar é uma função que limpa os campos do formulário e reseta o resultado, permitindo que o usuário faça uma nova simulação do zero.
  const handleResetar = () => {
    setEstadoSelecionado('');
    setConsumoMensal('');
    setResultado(null);
  };
  // handleKeyPress é uma função que permite ao usuário acionar o cálculo da economia pressionando a tecla "Enter" enquanto estiver focado no campo de entrada do consumo mensal, desde que os campos necessários estejam preenchidos corretamente.
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && podeCadcular) {
      handleCalcular();
    }
  };

  return (
    <div className="bg-white  h-auto  pt-6 px-6 pb-20 shadow-md">
      {/* FormularioCalculo é um componente funcional que representa um formulário para simulação de economia de energia. */}
      <div className="flex items-center gap-2 py-4 mb-6">
        <Calculator size={24} className="text-slate-700" />
        <h2 className="text-xl font-semibold text-slate-800">Simulação de Economia</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 py-3 mb-6">
        {/**
         * @component SeletorEstado
         * @description Componente controlado para seleção de UF
         * @param {Array} estados - Lista de estados disponíveis
         * @param {string} estadoSelecionado - UF atualmente selecionada
         * @param {function} setEstadoSelecionado - Setter do estado no componente pai
         */}
        <SeletorEstado
          estados={estadosData}
          estadoSelecionado={estadoSelecionado}
          setEstadoSelecionado={setEstadoSelecionado}
        />
        {/**
         * @component InputConsumo
         * @description Campo numérico para entrada do consumo mensal
         * @param {number|string} value - Valor atual do consumo
         * @param {function} onChange - Handler para atualização do valor
         */}
        <InputConsumo
          value={consumoMensal}
          onChange={(e) => setConsumoMensal(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      {/**
       * @component BotoesCalculoEnergia
       * @description Componente de ações do formulário com botões de calcular e resetar
       *
       * @param {function} onCalcular - Callback acionado ao clicar no botão Calcular
       * @param {function} onResetar - Callback acionado ao clicar no botão Resetar
       * @param {boolean} calculando - Estado de loading que desabilita os botões durante o cálculo
       * @param {boolean} disabled - Indica se o botão Calcular está desabilitado (validação do formulário)
       * @param {boolean} temResultados - Controla a visibilidade do botão Resetar quando há resultados
       *
       **/}
      <BotoesCalculoEnergia
        onCalcular={handleCalcular}
        onResetar={handleResetar}
        calculando={calculando}
        disabled={!podeCadcular}
        temResultados={resultado !== null}
      />
      {/* Painel de Resultado */}
      {resultado && (
        <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-8 bg-green-500 rounded-full"></div>
            <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
              Resultado da Simulação
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Estado */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <MapPin size={20} />
                <span className="text-xs font-semibold uppercase tracking-wide">Estado</span>
              </div>
              <span className="text-2xl font-bold text-slate-800">{resultado.estado}</span>
            </div>

            {/* Consumo */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Zap size={20} />
                <span className="text-xs font-semibold uppercase tracking-wide">Consumo</span>
              </div>
              <span className="text-2xl font-bold text-slate-800">
                {resultado.consumo} <span className="text-sm font-normal">kWh</span>
              </span>
            </div>

            {/* Tarifa */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-yellow-600 mb-2">
                <DollarSign size={20} />
                <span className="text-xs font-semibold uppercase tracking-wide">Tarifa</span>
              </div>
              <span className="text-2xl font-bold text-slate-800">
                R$ <span className="text-3xl">{resultado.tarifa.toFixed(3)}</span>
                <span className="text-sm font-normal">/kWh</span>
              </span>
            </div>

            {/* Custo Atual */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <TrendingUp size={20} />
                <span className="text-xs font-semibold uppercase tracking-wide">Custo Atual</span>
              </div>
              <span className="text-2xl font-bold text-slate-800">
                R$ <span className="text-3xl">{resultado.custoAtual}</span>
              </span>
            </div>

            {/* Economia Estimada - Destacado */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 text-white/90 mb-2">
                <Award size={20} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Economia Estimada
                </span>
              </div>
              <div className="text-white">
                <span className="text-sm font-medium">15% de economia</span>
                <div className="text-3xl font-bold mt-1">R$ {resultado.economia}</div>
              </div>
            </div>

            {/* Custo com Energia Solar */}
            <div className="bg-gradient-to-br from-green-500 to-green-400 rounded-xl p-4 shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-2 text-white/90 mb-2">
                <Sun size={20} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Com Energia Solar
                </span>
              </div>
              <div className="text-white">
                <span className="text-sm font-medium">Novo custo mensal</span>
                <div className="text-3xl font-bold mt-1">R$ {resultado.custoComEnergiaSolar}</div>
              </div>
            </div>
          </div>

          {/* SEÇÃO DE ECONOMIA - MAIS VISÍVEL */}
          <div className="mt-8 p-4 sm:p-5 bg-white rounded-xl border-2 border-green-300 shadow-md">
            {/* Cabeçalho - Responsivo */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full flex-shrink-0">
                  <Leaf size={24} className="text-green-600" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-green-800">
                    Impacto da Economia
                  </h4>
                  <p className="text-xs text-slate-500 hidden xs:block">
                    Comparação entre custo atual e com energia solar
                  </p>
                </div>
              </div>
              <div className="bg-green-100 px-3 py-1 rounded-full self-start sm:self-auto">
                <span className="text-green-700 font-bold text-xs sm:text-sm">
                  {((resultado.economia / resultado.custoAtual) * 100).toFixed(0)}% de economia
                </span>
              </div>
            </div>

            {/* Labels da barra de progresso - Responsivo */}
            <div className="space-y-3">
              <div className="flex flex-col xs:flex-row justify-between text-xs sm:text-sm gap-2">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-red-500 flex-shrink-0" />
                  <span className="font-semibold text-slate-700">Custo Atual</span>
                  <span className="text-red-600 font-bold text-sm sm:text-base">
                    R$ {resultado.custoAtual}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sun size={14} className="text-blue-500 flex-shrink-0" />
                  <span className="font-semibold text-slate-700">Com Energia Solar</span>
                  <span className="text-blue-600 font-bold text-sm sm:text-base">
                    R$ {resultado.custoComEnergiaSolar}
                  </span>
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className="absolute h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-700 flex items-center justify-end pr-3"
                  style={{
                    width: `${(resultado.custoComEnergiaSolar / resultado.custoAtual) * 100}%`,
                    maxWidth: '100%',
                  }}
                >
                  <span className="text-white text-xs font-bold hidden sm:inline">
                    {((resultado.custoComEnergiaSolar / resultado.custoAtual) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-600">0%</span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-600 hidden xs:inline">
                    50%
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-600">100%</span>
                </div>
              </div>

              {/* Destaque da economia - Responsivo */}
              <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left w-full sm:w-auto">
                    <p className="text-xs sm:text-sm text-green-800 font-semibold flex items-center justify-center sm:justify-start gap-1">
                      Economia mensal
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-green-700">
                      R$ {resultado.economia}
                    </p>
                  </div>

                  <div className="hidden xs:block h-10 w-px bg-green-300"></div>

                  <div className="text-center sm:text-right w-full sm:w-auto">
                    <p className="text-xs sm:text-sm text-green-800 font-semibold flex items-center justify-center sm:justify-end gap-1">
                      Economia anual
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-green-700">
                      R$ {(resultado.economia * 12).toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-green-500 rounded-full p-2 sm:p-3 flex-shrink-0">
                    <Award size={20} className="text-white sm:w-6 sm:h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioCalculo;
