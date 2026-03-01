import React, { useState, useEffect, useRef } from 'react';
import { Mail, Briefcase, Menu, X } from 'lucide-react';
import Logo from '../molecules/Logo';
import DropdownMenu from '../molecules/DropdownMenu';
import MobileMenu from '../molecules/MobileMenu';
import LoginButton from '../atoms/LoginButton';
import { Link } from 'react-router-dom';

const Header = () => {
  // Gerencia o estado de login do usuário
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Gerencia o estado de abertura do menu dropdown (desktop)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //  Gerencia o estado de abertura do menu dropdown Mais (Mobile)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  //  useRef é utilizado para criar uma referência ao elemento do dropdown, permitindo verificar se um clique ocorreu dentro ou fora dele.
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // event.target - o elemento que o usuário clicou
      // dropdownRef.current.contains(event.target) - verifica se o elemento clicado está dentro do dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Se clicar fora do dropdown, fecha o menu dropdown
        setIsDropdownOpen(false);
      }
    };
    // Toda vez que o usuário clicar em qualquer lugar da página, a função handleClickOutside é chamada para verificar se o clique ocorreu fora do dropdown. Se sim, o estado isDropdownOpen é definido como false, fechando o menu dropdown. O event listener é limpo quando o componente é desmontado para evitar vazamentos de memória.
    document.addEventListener('mousedown', handleClickOutside);
    // Limpa o event listener quando o componente é desmontado para evitar vazamentos de memória
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // toggleLogin é uma função que alterna o estado de login do usuário. Quando chamada, ela inverte o valor de isLoggedIn, fecha o dropdown e o menu móvel para garantir que a interface seja atualizada corretamente com base no estado de login do usuário.

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-slate-800 text-white py-4 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-4">
              <li>
                {/* LoginButton é um componente funcional que recebe duas props: isLoggedIn (um booleano que indica se o usuário está logado ou não) e onClick (uma função que é chamada quando o botão é clicado). O componente renderiza um botão estilizado com Tailwind CSS, que exibe um ícone e um texto diferente dependendo do estado de login do usuário. Se isLoggedIn for true, o botão mostrará um ícone de logout e o texto "Sair". Caso contrário, mostrará um ícone de login e o texto "Entrar". O botão também tem uma transição suave para a cor de fundo ao ser hoverado.*/}
                <LoginButton isLoggedIn={isLoggedIn} onClick={toggleLogin} />
              </li>

              <li>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
                  <Mail size={18} />
                  <span>
                    {' '}
                    <Link to="/contato">Contato</Link>
                  </span>
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
                  <Briefcase size={18} />
                  <span>Serviços</span>
                </button>
              </li>

              {/* DropdownMenu é um componente funcional que representa o menu dropdown no cabeçalho. Ele recebe quatro props: isOpen (um booleano que indica se o dropdown está aberto ou fechado), onToggle (uma função para alternar o estado do dropdown), onClose (uma função para fechar o dropdown) e dropdownRef (uma referência ao elemento do dropdown para detectar cliques fora dele). O componente renderiza um botão que, quando clicado, alterna a visibilidade do menu dropdown. O menu é posicionado de forma absoluta e contém uma lista de links gerados a partir do array dropdownItems. Cada link é renderizado usando o componente NavLink, e ao clicar em qualquer link, a função onClose é chamada para fechar o dropdown.*/}
              <DropdownMenu
                isOpen={isDropdownOpen}
                onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                onClose={() => setIsDropdownOpen(false)}
                dropdownRef={dropdownRef}
              />
            </ul>
          </nav>

          {/* Botão Mobile Menu */}
          {/* O botão de menu móvel é renderizado apenas em telas menores (usando a classe md:hidden). Ele exibe um ícone de menu (Menu) quando o menu móvel está fechado e um ícone de fechar (X) quando o menu móvel está aberto. O evento onClick alterna o estado isMobileMenuOpen, que controla a visibilidade do menu móvel. O atributo aria-label é usado para melhorar a acessibilidade, fornecendo uma descrição do botão para leitores de tela, indicando se ele abrirá ou fechará o menu.*/}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-700 transition-colors"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/*MobileMenu é um componente funcional que representa o menu de navegação para dispositivos móveis. Ele recebe três props: isLoggedIn (um booleano que indica se o usuário está logado ou não), onToggleLogin (uma função para alternar o estado de login) e onClose (uma função para fechar o menu móvel). O componente renderiza uma lista de links de navegação, incluindo um botão de login/logout e um submenu "Mais" que exibe opções adicionais. O submenu "Mais" tem sua própria lógica de abertura e fechamento, utilizando useState para controlar seu estado e useRef para detectar cliques fora do submenu, garantindo uma experiência de usuário intuitiva em dispositivos móveis. */}
        {isMobileMenuOpen && (
          <MobileMenu
            isLoggedIn={isLoggedIn}
            onToggleLogin={toggleLogin}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
