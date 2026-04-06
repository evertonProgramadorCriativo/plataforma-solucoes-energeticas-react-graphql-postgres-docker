import { useFormContext } from '../context/FormContext';

// Hook personalizado para enviar e-mails usando o contexto de formulários
export const useEmailSender = () => {
  // Acessa o contexto para poder atualizar o estado de envio de e-mail (loading, success, error)

  const { setEmailStatus } = useFormContext();

  /**
   * sendEmail — envia dados para a API e dispara os e-mails
   * @param {string} formName — 'contato' | 'footer' | 'calculo'
   * @param {object} payload  — dados do formulário já validados
   * @param {string} userEmail — e-mail do usuário (para confirmação)
   */

  // Define o estado de envio de e-mail como "carregando" no início do processo
  const sendEmail = async (formName, payload, userEmail) => {
    setEmailStatus({ loading: true, success: false, error: null });
    // Envia os dados para a API (endpoint /api/send-email) usando fetch. O backend é responsável por processar os dados e enviar os e-mails.
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName, // qual formulário originou o envio
          payload, // todos os campos preenchidos
          userEmail, // para o e-mail de confirmação ao cliente
          ownerEmail: 'evertonprogramadorcriativo@gmail.com',
        }),
      });
      // Se a resposta da API não for OK (status 200-299), lança um erro com a mensagem retornada pela API
      if (!res.ok) throw new Error(await res.text());
      // Se o envio for bem-sucedido, atualiza o estado para indicar sucesso e retorna um objeto com ok: true.
      setEmailStatus({ loading: false, success: true, error: null });
      return { ok: true };
    } catch (err) {
      // Se ocorrer um erro durante o processo de envio (como falha na rede ou resposta de erro da API), captura o erro, atualiza o estado para indicar que houve um erro e retorna um objeto com ok: false e a mensagem de erro.
      setEmailStatus({ loading: false, success: false, error: err.message });
      return { ok: false, error: err.message };
    }
  };
  // Retorna a função sendEmail para que os componentes possam usá-la para enviar e-mails.
  return { sendEmail };
};

/**
 * api/send-email (POST)
 *{
  "formName": "footer",
  "payload": {
    "nome": "Everton",
    "email": "teste@email.com"
  },
  "userEmail": "teste@email.com"
}

 */
