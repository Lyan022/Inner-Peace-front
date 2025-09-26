// Importações necessárias
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white ">
      {/* Linha marrom com título branco */}
      <div className="bg-[#A0522D] py-3"> {/* marrom do print */}
        <h1 className="text-3xl font-bold text-white text-center">Sobre</h1>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6 space-y-12">
        
        {/* Texto sobre o site */}
        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Sobre o site</h2>
          <p className="text-black leading-relaxed">
            Este site foi criado para oferecer um espaço acessível e acolhedor, onde 
            cada pessoa possa encontrar apoio psicológico e equilíbrio emocional.
          </p>
        </section>
        
        {/* Grid Missão e Visão */}
        <section className="grid md:grid-cols-2 gap-12">
          {/* Missão */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">Nossa missão</h2>
            <p className="text-black leading-relaxed mb-3">
              Nosso missão é tornar o cuidado psicológico mais acessível, humano e acolhedor.
            </p>
            <p className="text-black leading-relaxed">
              Buscamos oferecer um espaço seguro, onde cada pessoa possa ser ouvida com 
              empatia e respeito, encontrando apoio para fortalecer sua saúde mental e viver 
              com mais equilíbrio e bem-estar.
            </p>
          </div>
          
          {/* Visão */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">Nossa visão</h2>
            <p className="text-black leading-relaxed mb-3">
              Nossa visão é construir um espaço exclusivo de psicologia, reconhecido pelo 
              acolhimento humano, acessibilidade e compromisso com todos.
            </p>
            <p className="text-black leading-relaxed">
              Buscamos ser um projeto que aproxima cada vez mais as pessoas do cuidado com 
              a saúde mental, transformando vidas de formas positivas e duradoura.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};