import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
              {/* Menu */}
         <div>
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400">Sobre</a></li>
            <li><a href="#" className="hover:text-yellow-400">Serviços</a></li>
            <li><a href="#" className="hover:text-yellow-400">Contato</a></li>
          </ul>
        </div>
            {/* Equipamentos */}
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
            {/* Localização */}
        <div>
          <h2 className="text-xl font-bold mb-4">Como Chegar</h2>
          <p className="mb-3">
            Av. Alm. Silvio de Noronha, 12345 - Centro  
            <br /> Rio de Janeiro - RJ
          </p>

          <iframe
            title="Mapa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d772.570163437801!2d-43.16706931794097!3d-22.913970547144434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9981db5fa68f95%3A0x4d84017940e7a943!2sBossa%20Nova%20Mall!5e0!3m2!1spt-BR!2sbr!4v1772053447196!5m2!1spt-BR!2sbr"
            className="w-full h-40 rounded-lg"
            loading="lazy"
          ></iframe>
        </div>


      </div>
       
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 py-10">

        {/*  Contato */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-4 bg-yellow-500 lg:bg-transparent lg:text-white bg:text-black">Fale Conosco</h2>

          <ul className="space-y-2 text-gray-300">
            <li className="text-2xl">Telefone: (21) 99999-9999</li>
            <li className="text-2xl">WhatsApp: (21) 99999-9999</li>
            <li className="text-2xl">Email: contato@gmail.com</li>
          </ul>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-yellow-400">YouTube</a>
            <a href="#" className="hover:text-yellow-400">Instagram</a>
            <a href="#" className="hover:text-yellow-400">LinkedIn</a>
          </div>
        </div>
         {/* Formulário */}
        <div className="md:col-span-2" > 
          <h2 className="text-xl font-bold mb-4">
            Solicite um Orçamento
          </h2>

          <form className="space-y-3">
            <input
              type="text"
              placeholder="Nome"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            />

            <input
              type="text"
              placeholder="Consumo médio (kWh)"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            />

            <textarea
              placeholder="Mensagem"
              rows="3"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            ></textarea>

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded font-semibold w-full"
            >
              Enviar
            </button>
          </form>
        </div>
    </div>


      
    </footer>
  );
};

export default Footer;
