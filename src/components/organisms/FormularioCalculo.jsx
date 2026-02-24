import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { estadosData } from '../../data/estadosData';
import SeletorEstado from '../molecules/SeletorEstado';
import InputConsumo from '../molecules/InputConsumo';
import BotoesCalculoEnergia from '../molecules/BotoesCalculoEnergia';

// FormularioCalculo é um componente funcional que representa um formulário para simulação de economia de energia. Ele utiliza o estado local para gerenciar o estado selecionado do campo de seleção de estados e um indicador de carregamento. O componente renderiza um layout estilizado com Tailwind CSS, incluindo um cabeçalho com um ícone de calculadora e um título, seguido por um campo de seleção para escolher um estado. O valor do estado selecionado é exibido em um painel de debug para fins de desenvolvimento. O componente é projetado para ser reutilizável e pode ser facilmente integrado a outros componentes ou páginas da aplicação.
const FormularioCalculo = () => {
    // O estado estadoSelecionado é inicializado como uma string vazia, indicando que nenhum estado foi selecionado inicialmente. A variável loadingEstados é definida como false para simular o estado de carregamento dos estados, mas pode ser alterada para true para testar a funcionalidade de carregamento.
    const [estadoSelecionado, setEstadoSelecionado] = useState('');
    const [consumoMensal, setConsumoMensal] = useState('');


    return (
        <div className="bg-white  p-6 shadow-md">

            {/* O cabeçalho do formulário de cálculo é composto por um ícone de calculadora e um título "Simulação de Economia". */}

            <div className="flex items-center gap-2 mb-6">
                <Calculator size={24} className="text-slate-700" />
                <h2 className="text-xl font-semibold text-slate-800">Simulação de Economia</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">

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

                />

            </div>

            <BotoesCalculoEnergia
                calculando={false}
                //Se true o botão de calcular fica desabilitado   
                //Se false o botão de calcular fica habilitado  
                disabled={estadoSelecionado === '' || consumoMensal === ''}
                //Se true o botão de resetar aparece
                temResultados={true}
            />
            {/* Mostra o valor atual do estado */}
            <div className="mt-4 p-3 bg-slate-100 rounded-lg text-sm text-slate-600">
                <strong>Resultado do Input:</strong>
                <br />
                <code className="bg-white px-2 py-0.5 rounded border border-slate-200">
                    {estadoSelecionado === '' ? '""  Nenhum Estado Selecionado' : estadoSelecionado}
                </code>
                <br />
                <code className="bg-white px-2 py-0.5 rounded border border-slate-200">
                    {consumoMensal === '' ? '""  Nenhum Consumo Mensal Informado' : consumoMensal + ' kWh'}
                </code>
            </div>

        </div>
    );
};

export default FormularioCalculo;