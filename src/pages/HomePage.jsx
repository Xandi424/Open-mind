import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Users, Shield, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

function HomePage() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Heart,
      title: "Reduz o Estresse",
      description: "Diminui a pressão escolar através de apoio emocional contínuo"
    },
    {
      icon: Brain,
      title: "Melhora o Bem-estar",
      description: "Promove saúde mental e equilíbrio emocional dos estudantes"
    },
    {
      icon: Users,
      title: "Fortalece Vínculos",
      description: "Cria conexões sociais saudáveis e redes de apoio"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Open Mind</span>
            </motion.div>

            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={() => navigate('/chat')}
              >
                Chat de Apoio
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={() => navigate('/volunteer')}
              >
                Área do Voluntário
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 bg-clip-text text-transparent">
                  Open Mind
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Plataforma de Apoio à Saúde Mental Escolar
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              <img  
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl floating-animation" 
                alt="Estudantes felizes conversando em ambiente escolar acolhedor"
               src="https://images.unsplash.com/photo-1684216944707-59d70284717f" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => navigate('/chat')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Iniciar Chat Anônimo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => navigate('/volunteer')}
              >
                <Users className="w-5 h-5 mr-2" />
                Sou Voluntário
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              O Problema que Enfrentamos
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <p className="text-lg text-blue-100 leading-relaxed mb-6">
                  Muitos estudantes enfrentam desafios significativos com <strong className="text-orange-300">estresse acadêmico</strong>, 
                  <strong className="text-orange-300"> ansiedade</strong> e <strong className="text-orange-300">pressão social</strong>.
                </p>
                <p className="text-lg text-blue-100 leading-relaxed mb-6">
                  A falta de apoio psicológico adequado nas escolas deixa jovens sem recursos para lidar com 
                  suas emoções e desafios mentais.
                </p>
                <p className="text-lg text-blue-100 leading-relaxed">
                  É essencial criar espaços seguros onde estudantes possam buscar ajuda sem julgamentos.
                </p>
              </div>
              <div className="relative">
                <img  
                  className="w-full rounded-2xl shadow-xl" 
                  alt="Estudante estressado estudando com livros e preocupação"
                 src="https://images.unsplash.com/photo-1694266055816-9463a9f53056" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nossa Solução
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <img  
                  className="w-full rounded-2xl shadow-xl" 
                  alt="Jovens conversando em chat online de apoio emocional"
                 src="https://images.unsplash.com/photo-1610208384679-85441f2df2ac" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
              </div>
              <div className="text-left">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Chat Anônimo</h3>
                      <p className="text-blue-100">Conversas seguras e privadas sem necessidade de identificação</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Suporte Emocional</h3>
                      <p className="text-blue-100">Apoio de voluntários treinados e colegas que entendem</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Privacidade Total</h3>
                      <p className="text-blue-100">Sem coleta de dados pessoais, garantindo total anonimato</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Benefícios da Plataforma
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="glass-effect rounded-2xl p-8 text-center hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
                  <p className="text-blue-100">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para Começar?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Junte-se à nossa comunidade de apoio e comece sua jornada para uma melhor saúde mental.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => navigate('/chat')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Começar Chat Agora
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => navigate('/volunteer')}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Quero Ajudar Como Voluntário
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Open Mind</span>
          </div>
          <p className="text-blue-100 mb-4">
            Plataforma de Apoio à Saúde Mental Escolar
          </p>
          <p className="text-sm text-blue-200">
            © 2024 Open Mind. Cuidando da saúde mental estudantil com carinho e segurança.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default HomePage;
