import { Home, Building2, Factory, BarChart3, Wrench, ShieldCheck } from 'lucide-react';

export const statServiceArray = [
  { value: '1.200+', label: 'Instalações realizadas' },
  { value: '15 MW', label: 'Capacidade instalada' },
  { value: '98%', label: 'Clientes satisfeitos' },
  { value: '12 anos', label: 'De experiência' },
];

export const serviceDetails = [
  {
    icon: Home,
    titulo: 'Solar Residencial',
    tag: 'Mais popular',
    tagColor: 'bg-amber-100 text-amber-700',
    descricao:
      'Transforme sua casa em uma fonte de energia limpa e economize até 95% na conta de luz.',
    beneficios: [
      'Payback médio de 4-6 anos',
      'Garantia de 25 anos nos painéis',
      'Monitoramento via app',
      'Isenção de ICMS',
    ],
    preco: 'A partir de R$ 12.000',
    destaque: true,
  },
  {
    icon: Building2,
    titulo: 'Solar Comercial',
    tag: 'Negócios',
    tagColor: 'bg-blue-100 text-blue-700',
    descricao:
      'Reduza os custos operacionais do seu comércio e aumente a competitividade do negócio.',
    beneficios: [
      'Economia de 40–80% na conta',
      'Dedução de impostos',
      'Valorização imobiliária',
      'Relatórios de performance',
    ],
    preco: 'A partir de R$ 35.000',
    destaque: false,
  },
  {
    icon: Factory,
    titulo: 'Solar Industrial',
    tag: 'Enterprise',
    tagColor: 'bg-slate-100 text-slate-700',
    descricao:
      'Soluções de grande porte para indústrias que buscam redução de custos energéticos em escala.',
    beneficios: [
      'Projetos acima de 100kWp',
      'Engenharia especializada',
      'Financiamento facilitado',
      'SLA 99,5% uptime',
    ],
    preco: 'Sob consulta',
    destaque: false,
  },
  {
    icon: BarChart3,
    titulo: 'Consultoria Energética',
    tag: 'Diagnóstico',
    tagColor: 'bg-green-100 text-green-700',
    descricao:
      'Análise completa do seu perfil de consumo com recomendações técnicas e financeiras personalizadas.',
    beneficios: [
      'Laudo técnico completo',
      'Projeção de retorno (ROI)',
      'Comparativo de tarifas',
      'Relatório em 72h',
    ],
    preco: 'A partir de R$ 500',
    destaque: false,
  },
  {
    icon: Wrench,
    titulo: 'Manutenção & Suporte',
    tag: 'Pós-venda',
    tagColor: 'bg-purple-100 text-purple-700',
    descricao:
      'Manutenção preventiva e corretiva para garantir a máxima eficiência do seu sistema solar.',
    beneficios: [
      'Limpeza especializada',
      'Inspeção termográfica',
      'Substituição de inversores',
      'Atendimento emergencial',
    ],
    preco: 'Planos a partir de R$ 80/mês',
    destaque: false,
  },
  {
    icon: ShieldCheck,
    titulo: 'Monitoramento 24/7',
    tag: 'Smart',
    tagColor: 'bg-cyan-100 text-cyan-700',
    descricao:
      'Acompanhe a geração do seu sistema em tempo real com alertas inteligentes e dashboards personalizados.',
    beneficios: [
      'App iOS e Android',
      'Alertas por WhatsApp',
      'Relatórios mensais',
      'Análise de eficiência',
    ],
    preco: 'A partir de R$ 39/mês',
    destaque: false,
  },
];
