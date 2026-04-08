import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import 'dotenv/config'; // lê o .env automaticamente

const app = express();
// Cria a instância do Resend com a chave da API (agora disponível em process.env)
const resend = new Resend(process.env.RESEND_API_KEY);
// Agora você pode usar resend.emails.send() para enviar e-mails na rota abaixo
app.use(cors());
// Permite receber JSON no corpo das requisições
app.use(express.json());

// Rota POST /api/send-email para receber os dados do formulário e enviar os e-mails
app.post('/api/send-email', async (req, res) => {
  // Extrai os dados do corpo da requisição
  const { formName, payload, userEmail, ownerEmail } = req.body;

  console.log('Recebido:', { formName, userEmail }); // <-veja no terminal

  try {
    await resend.emails.send({
      from: 'empresaenergiaclarake.com', // use este no plano free
      to: ownerEmail,
      subject: `Novo formulário: ${formName}`,
      html: `<pre>${JSON.stringify(payload, null, 2)}</pre>`,
    });

    await resend.emails.send({
      from: 'empresaenergiaclarake.com',
      to: userEmail,
      subject: 'Recebemos sua mensagem — Calarke Energia',
      html: `<p>Olá, ${payload.nome}! Retornamos em até 24h.</p>`,
    });

    res.json({
      ok: true,
      recebido: req.body,
      mensagem: 'Email enviado com sucesso',
    });
  } catch (err) {
    console.error('Erro Resend:', err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(3001, () => console.log('Servidor rodando em http://localhost:3001'));
