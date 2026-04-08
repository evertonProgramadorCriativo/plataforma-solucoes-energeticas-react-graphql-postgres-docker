import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
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

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.nome.trim()) errs.nome = 'Nome é obrigatório';
    if (!form.email.trim()) errs.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'E-mail inválido';
    if (!form.telefone?.trim()) {
      errs.telefone = 'Telefone é obrigatório';
    } else {
      const apenasNumeros = form.telefone.replace(/\D/g, '');
      if (!/^[\d\s\-()+]+$/.test(form.telefone)) {
        errs.telefone = 'Use apenas números e caracteres válidos';
      } else if (apenasNumeros.length !== 10 && apenasNumeros.length !== 11) {
        errs.telefone = 'Telefone deve ter 10 ou 11 números';
      }
    }
    if (!form.empresa.trim()) errs.empresa = 'Empresa é obrigatório';
    if (!form.estado) errs.estado = 'Selecione um estado';
    if (!form.tipoServico) errs.tipoServico = 'Selecione o tipo de serviço';
    if (!form.consumoMensal) errs.consumoMensal = 'Consumo mensal é obrigatório';
    if (form.consumoMensal && (isNaN(form.consumoMensal) || form.consumoMensal <= 0)) {
      errs.consumoMensal = 'Consumo mensal deve ser um número positivo';
    }
    if (!form.mensagem.trim()) errs.mensagem = 'Mensagem é obrigatória';
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setEnviando(true);

    // Parâmetros que batem com as variáveis do template
    const templateParams = {
      nome: form.nome,
      email_cliente: form.email, // {{email_cliente}} no template
      telefone: form.telefone,
      empresa: form.empresa,
      estado: form.estado,
      tipoServico: form.tipoServico,
      consumoMensal: form.consumoMensal,
      mensagem: form.mensagem,
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      // Envio 1: confirmação para o cliente
      await emailjs.send(
        serviceId,
        import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMACAO,
        templateParams,
        publicKey
      );

      // Envio 2: notificação interna para você
      await emailjs.send(
        serviceId,
        import.meta.env.VITE_EMAILJS_TEMPLATE_INTERNO,
        templateParams,
        publicKey
      );

      setEnviando(false);
      setEnviado(true);
    } catch (err) {
      console.error('Erro ao enviar e-mail:', err);
      setEnviando(false);
      setErrors({ geral: 'Erro ao enviar. Verifique sua conexão e tente novamente.' });
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setEnviado(false);
  };

  // Tela de sucesso
  if (enviado) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center px-4">
        <div className="shadow-2xl p-10 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-5">
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

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <div className="grid sm:grid-cols-2 gap-5">
              <InputField label="Nome completo" icon={User} error={errors.nome}>
                <input
                  className={InputClass('nome', errors)}
                  placeholder="Seu nome"
                  value={form.nome}
                  onChange={handleChange('nome')}
                />
              </InputField>

              <InputField label="E-mail" icon={Mail} error={errors.email}>
                <input
                  type="email"
                  className={InputClass('email', errors)}
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange('email')}
                />
              </InputField>

              <InputField label="Telefone" icon={Phone} error={errors.telefone}>
                <input
                  className={InputClass('telefone', errors)}
                  placeholder="(11) 99999-9999"
                  value={form.telefone}
                  onChange={handleChange('telefone')}
                />
              </InputField>

              <InputField label="Empresa" icon={Building2} error={errors.empresa}>
                <input
                  className={InputClass('empresa', errors)}
                  placeholder="Nome da empresa (opcional)"
                  value={form.empresa}
                  onChange={handleChange('empresa')}
                />
              </InputField>

              <InputField label="Estado" icon={MapPin} error={errors.estado}>
                <div className="relative">
                  <select
                    className={`${InputClass('estado', errors)} appearance-none pr-10`}
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
                    className={`${InputClass('tipoServico', errors)} appearance-none pr-10`}
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
                  className={InputClass('consumoMensal', errors)}
                  placeholder="Ex: 500"
                  min="1"
                  value={form.consumoMensal}
                  onChange={handleChange('consumoMensal')}
                />
              </InputField>
            </div>

            <div className="mt-5 py-7">
              <InputField
                label="Mensagem / Detalhes da proposta"
                icon={MessageSquare}
                error={errors.mensagem}
              >
                <textarea
                  rows={5}
                  className={`${InputClass('mensagem', errors)} resize-none`}
                  placeholder="Descreva suas necessidades..."
                  value={form.mensagem}
                  onChange={handleChange('mensagem')}
                />
              </InputField>
            </div>

            {/* Erro geral de envio */}
            {errors.geral && (
              <p className="text-red-500 text-sm text-center mb-4 p-3 bg-red-50 rounded-xl">
                {errors.geral}
              </p>
            )}

            <button
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl
                bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed
                text-white font-bold text-base transition-all shadow-lg shadow-amber-200
                hover:shadow-amber-300 hover:-translate-y-0.5 active:translate-y-0"
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
