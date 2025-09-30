// Importações necessárias
import { motion } from "framer-motion";

export const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white">
      {/* Cabeçalho */}
      <motion.div
        className="bg-[#8B4513] py-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >

      </motion.div>

      <div className="max-w-6xl mx-auto py-16 px-6 space-y-16">
        {/* Texto sobre o site */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-black mb-4 border-l-4 border-[#6B3E1E] pl-3">
            Sobre o site
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Este site foi criado para oferecer um espaço acessível e acolhedor, onde
            cada pessoa possa encontrar apoio psicológico e equilíbrio emocional.
          </p>
        </motion.section>

        {/* Grid Missão e Visão */}
        <section className="grid md:grid-cols-2 gap-12">
          {/* Missão */}
          <motion.div
            className="bg-[#FFFDFB] rounded-2xl shadow-lg p-8 border border-[#E2D4C8] hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-black mb-4">
              Nossa missão
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Nosso missão é tornar o cuidado psicológico mais acessível, humano e acolhedor.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Buscamos oferecer um espaço seguro, onde cada pessoa possa ser ouvida com
              empatia e respeito, encontrando apoio para fortalecer sua saúde mental e viver
              com mais equilíbrio e bem-estar.
            </p>
          </motion.div>

          {/* Visão */}
          <motion.div
            className="bg-[#FFFDFB] rounded-2xl shadow-lg p-8 border border-[#E2D4C8] hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-black mb-4">
              Nossa visão
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Nossa visão é construir um espaço exclusivo de psicologia, reconhecido pelo
              acolhimento humano, acessibilidade e compromisso com todos.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Buscamos ser um projeto que aproxima cada vez mais as pessoas do cuidado com
              a saúde mental, transformando vidas de formas positivas e duradoura.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
};
