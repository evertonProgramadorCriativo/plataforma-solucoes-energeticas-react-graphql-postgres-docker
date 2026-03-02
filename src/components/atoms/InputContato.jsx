// Componente container para campos de formulário com label, ícone e feedback de erro
// - Label com ícone opcional (ícone âmbar quando fornecido)
// - Exibe mensagem de erro quando a prop 'error' é fornecida
// - O input deve ser passado como children para maior flexibilidade
export const InputField = ({ label, icon: Icon, error, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-slate-600 flex items-center gap-1.5">
      {Icon && <Icon size={14} className="text-amber-500" />}
      {label}
    </label>
    {children}
    {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
  </div>
);
// Utilitário para classes de input com estados dinâmicos
// - Retorna classes Tailwind base para inputs
// - Adiciona borda vermelha/fundo vermelho se houver erro no campo específico
// - Efeito hover e foco consistente (borda âmbar no foco)
export const InputClass = (field, errors = {}) =>
  `w-full px-4 py-3 rounded-xl border-2 text-slate-800 text-sm bg-white
    transition-all outline-none focus:border-amber-400
    ${errors[field] ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300'}`;
