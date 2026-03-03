import React, { useState } from 'react';
import BackButton from '../components/atoms/BackButton';
import {
  Send,
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  ChevronDown,
  CheckCircle2,
  Zap,
  MessageSquare,
} from 'lucide-react';
import { sidebarInfoContato } from '../data/sidebarInfoContato';
import { initialForm } from '../data/contatoForm';
import { InputField, InputClass } from '../components/atoms/InputContato';
import { estadosBR, tiposServicoArray } from '../data/estadosData';
import { useNavigate } from 'react-router-dom';

const ContatoPage = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const navigate = useNavigate();
  // handleChange: função de ordem superior (retorna outra função)
  // Recebe o nome do campo (ex: 'nome', 'email') como argumento
  const handleChange = (field) => (e) => {
    // Captura o valor digitado pelo usuário no input
    // Resultado esperado: string com o texto atual do campo
    const value = e.target.value;
    // Atualiza o estado do formulário sem sobrescrever os outros campos
    // Usa o padrão funcional para garantir que "prev" seja sempre o estado mais recente
    setForm((prev) => {
      // Copia todos os campos anteriores e sobrescreve apenas o campo alterado
      // Ex: se field = 'nome' e value = 'João', atualiza só form.nome
      // Resultado esperado: objeto com todos os campos, apenas o alterado com novo valor
      /**
       * ...prev =  {nome: '', email: '', telefone: '', ...}
       * [field]: value = {nome: 'João'}
       * Resultado final: {nome: 'João', email: '', telefone: '', ...}
       * Cada vez que o usuário digitar, o console.log mostrará o estado atualizado do formulário.
       * Isso é crucial para garantir que o estado do formulário seja sempre consistente com o que o usuário vê na tela.
       * Sem essa abordagem, poderíamos acabar com um estado desatualizado ou sobrescrevendo campos acidentalmente.
       */
      const updated = { ...prev, [field]: value };
      // Exibe no console o estado completo após a alteração (útil para debug)
      // Resultado esperado: objeto impresso no console a cada tecla digitada
      //console.log(updated);
      // Retorna o novo estado para o setForm aplicar
      return updated;
    });
  };

  // validate: função que verifica se os campos obrigatórios foram preenchidos
  // Não recebe parâmetros — lê diretamente o estado "form"

  const validate = () => {
    // Cria um objeto vazio que vai acumular os erros encontrados
    // Resultado esperado: {} quando não há erros, ou { campo: 'mensagem' } quando há erros
    const errs = {};

    // Verifica se o campo nome está vazio ou contém só espaços
    // .trim() remove espaços antes e depois da string
    // Se vazio, adiciona a mensagem de erro no objeto errs com a chave 'nome'
    // Resultado esperado: errs.nome = 'Nome é obrigatório' quando o campo não foi preenchido
    if (!form.nome.trim()) errs.nome = 'Nome é obrigatório';
    // Verifica se o campo email está vazio ou contém só espaços
    if (!form.email.trim()) errs.email = 'E-mail é obrigatório';
    // Verifica se o email tem um formato válido usando expressão regular
    // '/' Abre e fecha a expressão regular
    // ^ Início da string
    // [^\s@]+ Um ou mais caracteres que não sejam espaço ou '@'
    // @ O símbolo '@' obrigatório
    // [^\s@]+ Um ou mais caracteres que não sejam espaço ou '@' (domínio)
    // \. O ponto '.' obrigatório (precisa ser escapado com '\')
    // [^\s@]+ Um ou mais caracteres que não sejam espaço ou '@' (extensão)
    // $ Fim da string
    /*
    Exemplos práticos:

      joao@gmail.com      -> VALIDO   (passa em tudo)
      joao@gmail          -> INVALIDO (falta o .com)
      joaogmail.com       -> INVALIDO (falta o @)
      jo ao@gmail.com     -> INVALIDO (tem espaço)
      @gmail.com          -> INVALIDO (nada antes do @)
      joao@.com           -> INVALIDO (nada entre @ e o ponto)
    */ else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'E-mail inválido';
    // Verifica se o campo telefone está vazio ou contém só espaços
    if (!form.telefone?.trim()) {
      errs.telefone = 'Telefone é obrigatório';
    } else {
      const apenasNumeros = form.telefone.replace(/\D/g, '');
      // Verifica se o telefone contém apenas números e caracteres válidos (parênteses, espaços, hífens, etc.)
      //xxx-xxx-xxxx -> 10 dígitos
      if (!/^[\d\s\-()+]+$/.test(form.telefone)) {
        errs.telefone = 'Use apenas números e caracteres válidos';
      } else if (apenasNumeros.length !== 10 && apenasNumeros.length !== 11) {
        errs.telefone = 'Telefone deve ter 10 ou 11 números';
      }
    }

    // O campo empresa é opcional, mas se o usuário digitar algo, vamos validar que não seja só espaços
    if (!form.empresa.trim()) errs.empresa = 'empresa é obrigatório';
    //Se o campo estado estiver vazio ou não selecionado, adiciona a mensagem de erro
    if (!form.estado) errs.estado = 'Selecione um estado';
    // Verifica se o campo tipoServico está vazio ou não selecionado, adiciona a mensagem de erro
    if (!form.tipoServico) errs.tipoServico = 'Selecione o tipo de serviço';
    // Verifica se o campo consumoMensal está vazio, se for menor ou igual a zero, ou se não for um número válido
    if (!form.consumoMensal) errs.consumoMensal = 'Consumo mensal é obrigatório';
    // isNaN() verifica se o valor não é um número (retorna true se não for um número)
    if (form.consumoMensal && (isNaN(form.consumoMensal) || form.consumoMensal <= 0)) {
      errs.consumoMensal = 'Consumo mensal deve ser um número positivo';
    }
    // Verifica se o campo mensagem está vazio ou contém só espaços
    if (!form.mensagem.trim()) errs.mensagem = 'Mensagem é obrigatória';

    // Retorna o objeto de erros (vazio se tudo estiver correto)
    // Resultado esperado: {} se válido, ou { nome: 'Nome é obrigatório' } se inválido
    return errs;
  };
  // handleSubmit: função chamada quando o usuário clica em "Enviar"

  const handleSubmit = () => {
    // Executa a validação e armazena os erros encontrados
    // Resultado esperado: objeto vazio {} ou com os campos inválidos
    const errs = validate();

    // Verifica se existe pelo menos um erro no objeto retornado
    // Object.keys() retorna um array com as chaves do objeto
    // Se o array tiver tamanho maior que 0, há erros

    if (Object.keys(errs).length > 0) {
      // Atualiza o estado de erros para exibir as mensagens nos inputs
      // Resultado esperado: os campos inválidos ficam com borda vermelha e mensagem de erro
      setErrors(errs);
      // Interrompe a execução para não prosseguir com o envio do formulário
      return;
    }
    // Se chegou aqui, não há erros — limpa qualquer erro anterior exibido na tela
    setErrors({});
    // Simula o envio do formulário (pode ser uma chamada API real no futuro)
    setEnviando(true);
    // Após 1.8 segundos, considera que o envio foi concluído com sucesso
    setTimeout(() => {
      // Atualiza os estados para refletir que o envio terminou e a proposta foi enviada
      setEnviando(false);
      // Exibe a mensagem de sucesso e os dados enviados (pode ser substituído por uma resposta real da API)
      setEnviado(true);
    }, 1800);
    setErrors({});
    // Se chegou aqui, não há erros — limpa qualquer erro anterior exibido na tela
    // Resultado esperado: todos os campos voltam ao estilo normal sem mensagens de erro

    alert(
      `Formulário enviado com sucesso!\n\nNome: ${form.nome}\nEmpresa: ${form.empresa}\n E-mail: ${form.email}\n Telefone: ${form.telefone} \n Estado: ${form.estado} \n Tipo de Serviço: ${form.tipoServico} \n Consumo Mensal: ${form.consumoMensal} kWh \n Mensagem: ${form.mensagem}`
    );
  };
  // handleReset: função para limpar o formulário e permitir enviar uma nova proposta
  const handleReset = () => {
    // Reseta o estado do formulário para os valores iniciais definidos em initialForm
    //initialForm : { nome: '', email: '', telefone: '', empresa: '', estado: '', consumoMensal: '', mensagem: '' }
    setForm(initialForm);
    // setErrors({}) limpa o estado de erros para que as mensagens de erro desapareçam da tela
    setErrors({});
    // setEnviado(false) volta o estado de "enviado" para false, permitindo que o usuário veja o formulário novamente
    setEnviado(false);
  };
  if (true) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center px-4">
        <div className="shadow-2xl p-10 max-w-md w-full text-center animate-fade-in">
          <div className="flex justify-center  mb-6">
            <div className="bg-green-100  w-fullrounded-full p-5">
              <CheckCircle2 size={52} className="text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Proposta Enviada!</h2>
          <p className="text-slate-500 mb-2 text-sm leading-relaxed">
            Recebemos sua solicitação com sucesso. Nossa equipe analisará sua proposta e entrará em
            contato em até <strong>24 horas úteis</strong>.
          </p>
          <p className="text-slate-400 text-xs mb-8">
            Um e-mail de confirmação foi enviado para <strong>{form.email}</strong>
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors"
            >
              Enviar Nova Proposta
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-semibold transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[500px]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <BackButton />
        {/* Header Contato Solicitar Proposta */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-amber-500 rounded-xl p-2.5">
              <Send size={22} className="text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800">Solicitar Proposta</h1>
          </div>
          <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
            Preencha o formulário abaixo e nossa equipe especializada elaborará uma proposta
            personalizada para sua necessidade energética.
          </p>
        </div>
        {/* Sidebar Infomação da empresa */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-4">
            {sidebarInfoContato.map(({ icon, title, desc }) => {
              const Icon = icon;
              return (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex gap-4 items-start"
                >
                  <div className="bg-amber-50 rounded-xl p-2.5 shrink-0">
                    <Icon size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Componente InputField reutilizável que encapsula label, ícone e mensagem de erro */}
              <InputField label="Nome completo" icon={User} error={errors.nome}>
                <input
                  className={InputClass('nome')}
                  placeholder="Seu nome"
                  value={form.nome}
                  onChange={handleChange('nome')}
                />
              </InputField>
              <InputField label="E-mail" icon={Mail} error={errors.email}>
                <input
                  type="email"
                  className={InputClass('email')}
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange('email')}
                />
              </InputField>
              <InputField label="Telefone" icon={Phone} error={errors.telefone}>
                <input
                  className={InputClass('telefone')}
                  placeholder="(11) 99999-9999"
                  value={form.telefone}
                  onChange={handleChange('telefone')}
                />
              </InputField>
              <InputField label="Empresa" icon={Building2} error={errors.empresa}>
                <input
                  className={InputClass('empresa')}
                  placeholder="Nome da empresa (opcional)"
                  value={form.empresa}
                  onChange={handleChange('empresa')}
                />
              </InputField>

              <InputField label="Estado" icon={MapPin} error={errors.estado}>
                <div className="relative">
                  <select
                    className={`${InputClass('estado')} appearance-none pr-10`}
                    value={form.estado}
                    onChange={handleChange('estado')}
                  >
                    <option value="">Selecione...</option>
                    {estadosBR.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </InputField>
              <InputField label="Tipo de Serviço" icon={Zap} error={errors.tipoServico}>
                <div className="relative">
                  <select
                    className={`${InputClass('tipoServico')} appearance-none pr-10`}
                    value={form.tipoServico}
                    onChange={handleChange('tipoServico')}
                  >
                    <option value="">Selecione...</option>
                    {tiposServicoArray.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </InputField>

              <InputField label="Consumo Mensal (kWh)" icon={Zap} error={errors.consumoMensal}>
                <input
                  type="number"
                  className={InputClass('consumoMensal')}
                  placeholder="Ex: 500"
                  min="1"
                  value={form.consumoMensal}
                  onChange={handleChange('consumoMensal')}
                />
              </InputField>
            </div>
            {/* Mensagem */}
            <div className="mt-5 py-7">
              <InputField
                label="Mensagem / Detalhes da proposta"
                icon={MessageSquare}
                error={errors.mensagem}
              >
                <textarea
                  rows={5}
                  className={`${InputClass('mensagem')} resize-none`}
                  placeholder="Descreva suas necessidades, dúvidas ou detalhes sobre o imóvel..."
                  value={form.mensagem}
                  onChange={handleChange('mensagem')}
                />
              </InputField>
            </div>
            <button
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl
              bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed
              text-white font-bold text-base transition-all shadow-lg shadow-amber-200
              hover:shadow-amber-300 hover:-translate-y-0.5 active:translate-y-0 "
              disabled={enviando}
              onClick={handleSubmit}
            >
              {enviando ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando proposta...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Enviar Proposta de Contratação
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContatoPage;
