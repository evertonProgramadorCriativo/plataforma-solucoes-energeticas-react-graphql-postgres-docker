// Dados: array com os 5 banners
// Cada objeto representa um slide: gradiente, badge, título, subtítulo,
// cta (call to action), tag promocional, imagem e modo de texto (claro/escuro)
export const bannersData = [
  {
    bg: 'from-amber-400 to-amber-500',
    badge: 'Loja Oficial', // badge = rótulo, etiqueta ou selo
    title: 'ENERGIA SOLAR\nPARA SUA CASA',
    sub: 'Economize até 95% na conta de luz',
    cta: 'Simular economia',
    tag: 'Instalação inclusa',
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=80',
    imgAlt: 'Painel solar residencial',
    textDark: true, // true = texto escuro (banner claro), false = texto branco (banner escuro)
  },
  {
    bg: 'from-slate-800 to-slate-900',
    badge: 'Novidade', //badge =  rótulo, etiqueta ou selo
    title: 'PAINEL BIFACIAL\n610W',
    sub: 'Geração dupla face — até 30% mais energia',
    cta: 'Ver produto',
    tag: 'Até 30 anos de garantia',
    img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=700&q=80',
    imgAlt: 'Painel bifacial',
    textDark: false,
  },
  {
    bg: 'from-green-600 to-green-700',
    badge: 'Mais vendido',
    title: 'KIT SOLAR\nCOMPLETO',
    sub: 'Painéis + Inversor + Instalação em até 3 dias',
    cta: 'Montar meu kit',
    tag: 'Para residências e comércios',
    img: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=700&q=80',
    imgAlt: 'Kit solar completo',
    textDark: false,
  },
  {
    bg: 'from-blue-700 to-blue-900',
    badge: 'Smart Energy',
    title: 'MONITORAMENTO\nEM TEMPO REAL',
    sub: 'Acompanhe sua geração pelo celular 24/7',
    cta: 'Conhecer app',
    tag: 'iOS e Android grátis',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80',
    imgAlt: 'Monitoramento solar',
    textDark: false,
  },
  {
    bg: 'from-orange-500 to-orange-600',
    badge: 'Promoção',
    title: 'BATERIA LÍTIO\n10kWh',
    sub: 'Autonomia total mesmo sem sol. 6.000 ciclos.',
    cta: 'Ver oferta',
    tag: 'Frete grátis para SP e RJ',
    img: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=700&q=80',
    imgAlt: 'Bateria solar lítio',
    textDark: false,
  },
];
