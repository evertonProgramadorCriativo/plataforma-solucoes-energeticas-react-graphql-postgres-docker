import React from 'react';
import { Link } from 'react-router-dom';

// NavLink é um componente funcional que recebe quatro props: href (a URL para a qual o link deve apontar), alt (um texto alternativo para acessibilidade), nome (o texto que será exibido no link) e onClick (uma função que é chamada quando o link é clicado). O componente renderiza um elemento <a> estilizado com Tailwind CSS, que exibe o nome do link e tem uma transição suave para a cor de fundo ao ser hoverado. O atributo aria-label é usado para melhorar a acessibilidade, fornecendo uma descrição do link para leitores de tela.
const NavLink = ({ href, alt, nome, onClick }) => (
  <Link
    to={href}
    aria-label={alt}
    onClick={onClick}
    className="block px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors"
  >
    {nome}
  </Link>
);

export default NavLink;
