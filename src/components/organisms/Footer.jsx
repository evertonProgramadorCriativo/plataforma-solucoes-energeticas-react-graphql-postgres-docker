import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

         <div>
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400">Sobre</a></li>
            <li><a href="#" className="hover:text-yellow-400">Serviços</a></li>
            <li><a href="#" className="hover:text-yellow-400">Contato</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Equipamentos de Energia</h2>
          <ul className="space-y-2">
            <li>Geradores</li>
            <li>Placas solares</li>
            <li>Baterias</li>
            <li>Inversores</li>
            <li>Nobreaks</li>
          </ul>
        </div>

      </div>

      
    </footer>
  );
};

export default Footer;
