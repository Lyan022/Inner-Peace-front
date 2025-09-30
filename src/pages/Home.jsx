// Importações necessárias
import { Link } from 'react-router-dom'; // Para navegação entre páginas
import { motion } from 'framer-motion'; // Para animações suaves
import { Shield, Zap, Users, Calendar, Activity, FileText } from 'lucide-react'; // Ícones vetoriais
import { Button } from '../components/Button'; // Botão customizado do projeto

// Página inicial (Home)
export const Home = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Agenda Dinâmica',
      description: 'Visualização de horários disponíveis com marcação automática e lembretes por e-mail'
    },
    {
      icon: Shield,
      title: 'Privacidade Garantida',
      description: 'Autenticação segura via JWT e proteção total dos dados sensíveis dos pacientes'
    },
    {
      icon: Activity,
      title: 'Análise Inteligente',
      description: 'Machine Learning para identificar padrões emocionais e agrupar perfis de risco'
    },
    {
      icon: Users,
      title: 'Impacto Social',
      description: 'Voltado para projetos voluntários, universidades e ONGs que oferecem apoio psicológico'
    },
    {
      icon: FileText,
      title: 'Histórico Estruturado',
      description: 'Registro organizado de sessões com temas, recomendações e evolução do paciente'
    },
    {
      icon: Zap,
      title: 'Interface Acolhedora',
      description: 'Design responsivo e acessível, pensado para conforto emocional dos usuários'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white ">

      {/* ===== Faixa marrom no topo (sem título) ===== */}
      <div className="bg-[#8B4513] py-4"></div>

      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex items-center">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Texto da esquerda */}
          <div className="space-y-10">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Pronto para <br /> encontrar a Paz?
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
              A psicologia é o caminho sereno de compreender a mente e reencontrar o equilíbrio interior.
            </p>
            <Link to="/register">
              <Button size="lg" className="mt-4 bg-[#B1612E] hover:bg-[#B1612E] text-white px-8 py-4 rounded-xl text-lg font-semibold">
                Entrar
              </Button>
            </Link>
          </div>
          {/* Imagem da direita */}
          <div className="flex justify-center md:justify-end w-full h-full">
            <img
              src="/imagem.png"
              alt="Sessão de psicologia"
              className="w-[90%] md:w-[600px] lg:w-[750px] h-auto object-cover rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>

        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="min-h-screen flex items-center py-20">
        <div className="w-full">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-dark mb-6">
                Tecnologia a Serviço do Cuidado
              </h2>
              <p className="text-xl text-dark max-w-3xl mx-auto">
                Ferramentas inteligentes para organizar, acompanhar e potencializar atendimentos voluntários
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <feature.icon className="w-10 h-10 text-dark" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-4">{feature.title}</h3>
                <p className="text-black leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="min-h-screen flex items-center py-20">
        <div className="w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-8">
              Faça Parte desta Transformação Social
            </h2>
            <p className="text-xl text-dark mb-12 max-w-3xl mx-auto leading-relaxed">
              Una tecnologia e responsabilidade social. Ajude a democratizar o acesso
              à saúde mental através de uma plataforma pensada para o bem-estar coletivo.
            </p>
            <Link to="/register">
              <Button size="lg" className="text-xl px-12 py-5 rounded-2xl font-semibold">
                Criar Conta Gratuita
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
