import React, { createContext, useContext, useState } from 'react';

//  Cria o contexto -> valor padrão null
export const FormContext = createContext(null);

//  Estado inicial compartilhado entre TODOS os formulários
const initialState = {
  // FormularioCalculo (HomePage)
  calculo: {
    estadoSelecionado: '',
    consumoMensal: '',
    resultado: null,
  },
  // ContatoPage
  contato: {
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    estado: '',
    tipoServico: '',
    consumoMensal: '',
    mensagem: '',
  },
  // Footer (orçamento rápido)
  footer: {
    nome: '',
    email: '',
    consumoMedio: '',
    mensagem: '',
  },
};

// Provider -> envolve toda a aplicação em App.jsx
export const FormProvider = ({ children }) => {
  //Guarda e controla todos os dados dos formulários.

  const [forms, setForms] = useState(initialState);
  // Controla envio de email (loading, sucesso, erro)
  const [emailStatus, setEmailStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  //Atualiza um campo específico dentro de um formulário específico, sem apagar o resto do formulário. Exemplo: updateField('contato', 'nome', 'João') atualiza apenas o campo "nome" do formulário "contato", mantendo os outros campos intactos.
  // prev = estado anterior (forms atual)
  //copia tudo (...prev)
  // Sobrescreve o formulário específico ([formName]) com uma cópia do formulário anterior (...prev[formName]) e atualiza o campo específico ([field]) com o novo valor (value).
  /**


Copia todos os formulários

 ...prev[formName]

Copia todos os campos do formulário

 [field]: value

Atualiza só 1 campo
-----------------------------
VISUAL SIMPLES
Antes:
contato:
  nome: ""
  email: "teste@email.com"
-----------------------------------------
Depois:
contato:
  nome: "João" --> ok
  email: "teste@email.com"} formName

 */
  // Uso: updateField('contato', 'nome', 'João')
  const updateField = (formName, field, value) => {
    setForms((prev) => ({
      ...prev,
      [formName]: { ...prev[formName], [field]: value },
    }));
  };

  // Reseta 1 formulário para o estado inicial
  const resetForm = (formName) => {
    setForms((prev) => ({
      ...prev,
      [formName]: initialState[formName],
    }));
  };

  return (
    <FormContext.Provider value={{ forms, updateField, resetForm, emailStatus, setEmailStatus }}>
      {children}
    </FormContext.Provider>
  );
};

// Hook de atalho para consumir o contexto
export const useFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormContext deve estar dentro de FormProvider');
  return ctx;
};
