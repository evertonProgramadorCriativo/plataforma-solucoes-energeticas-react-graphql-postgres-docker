import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ to = '/home', label = 'Voltar' }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-8 transition-colors group"
    >
      <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}

// Componente reutilizável de botão "Voltar" com navegação dinâmica usando react-router.
