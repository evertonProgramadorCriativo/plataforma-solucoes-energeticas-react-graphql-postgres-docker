import React, { useState } from 'react';
import BackButton from '../components/atoms/BackButton';
import { Send, User } from 'lucide-react';
import { sidebarInfoContato } from '../data/sidebarInfoContato';
import { initialForm } from '../data/contatoForm';
import { InputField, InputClass } from '../components/atoms/InputContato';
const ContatoPage = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

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
      console.log(updated);
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
    setErrors({});
    // Se chegou aqui, não há erros — limpa qualquer erro anterior exibido na tela
    // Resultado esperado: todos os campos voltam ao estilo normal sem mensagens de erro

    alert(`Formulário enviado com sucesso! Nome: ${form.nome}`);
  };

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
              <InputField label="Nome completo *" icon={User} error={errors.nome}>
                <input
                  className={InputClass('nome')}
                  placeholder="Seu nome"
                  value={form.nome}
                  onChange={handleChange('nome')}
                />
              </InputField>
              <button onClick={handleSubmit}>Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContatoPage;
