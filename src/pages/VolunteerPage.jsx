import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Heart, Users, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function VolunteerPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [volunteerName] = useState(`Voluntário${Math.floor(Math.random() * 100)}`);
  const [isOnline, setIsOnline] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = localStorage.getItem('openMindMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Listen for new messages
    const handleStorageChange = (e) => {
      if (e.key === 'openMindMessages') {
        const updatedMessages = JSON.parse(e.newValue || '[]');
        setMessages(updatedMessages);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    toast({
      title: isOnline ? "Você saiu de serviço" : "Você entrou em serviço",
      description: isOnline ? "Não receberá mais notificações de mensagens" : "Agora você pode ajudar estudantes que precisam de apoio",
    });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    if (!isOnline) {
      toast({
        title: "Você precisa estar online",
        description: "Ative seu status online para enviar mensagens de apoio",
        variant: "destructive"
      });
      return;
    }

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: volunteerName,
      timestamp: new Date().toISOString(),
      isSystem: false,
      isVolunteer: true
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('openMindMessages', JSON.stringify(updatedMessages));
    setNewMessage('');

    toast({
      title: "Mensagem de apoio enviada!",
      description: "Sua mensagem foi compartilhada com carinho.",
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quickResponses = [
    "Entendo como você está se sentindo. Você não está sozinho(a) nisso.",
    "É normal sentir-se assim às vezes. Que tal conversarmos sobre o que está te preocupando?",
    "Você foi muito corajoso(a) ao compartilhar isso. Como posso te ajudar?",
    "Lembre-se: você é mais forte do que imagina. Vamos encontrar uma solução juntos.",
    "Seus sentimentos são válidos. Quer me contar mais sobre o que está acontecendo?"
  ];

  const addQuickResponse = (response) => {
    setNewMessage(response);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header 
        className="glass-effect border-b border-white/20 p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">Área do Voluntário</h1>
              <p className="text-sm text-blue-200">Conectado como {volunteerName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleOnlineStatus}
              className={`${
                isOnline 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-gray-500 hover:bg-gray-600'
              } text-white rounded-full px-4 py-2 transition-all duration-200`}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-white pulse-animation' : 'bg-gray-300'}`}></div>
              {isOnline ? 'Online' : 'Offline'}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Volunteer Info */}
      <motion.div 
        className="bg-orange-500/20 border border-orange-400/30 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-3 text-orange-100">
            <Heart className="w-5 h-5 text-orange-300" />
            <p className="text-sm">
              <strong>Área do Voluntário:</strong> Você está ajudando estudantes que precisam de apoio emocional. 
              Seja empático, respeitoso e lembre-se de que suas palavras podem fazer a diferença.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isVolunteer ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl chat-bubble ${ 
                  message.isSystem 
                    ? 'bg-orange-500/20 border border-orange-400/30 text-orange-100'
                    : message.isVolunteer
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                    : 'glass-effect text-white'
                }`}>
                  {!message.isSystem && (
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${ 
                        message.isVolunteer ? 'bg-green-300' : 'bg-blue-300'
                      }`}></div>
                      <span className="text-xs opacity-75">{message.sender}</span>
                      {message.isVolunteer && (
                        <span className="text-xs bg-green-600 px-2 py-0.5 rounded-full">Voluntário</span>
                      )}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-60 mt-1">{formatTime(message.timestamp)}</p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <motion.div 
            className="p-4 glass-effect border-t border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isOnline ? "Digite uma mensagem de apoio..." : "Ative seu status online para enviar mensagens"}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-blue-200 resize-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent disabled:opacity-50"
                  rows="2"
                  disabled={!isOnline}
                />
              </div>
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim() || !isOnline}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Quick Responses Sidebar */}
        <motion.div 
          className="w-80 glass-effect border-l border-white/20 p-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-green-400" />
            Respostas Rápidas
          </h3>
          <div className="space-y-3">
            {quickResponses.map((response, index) => (
              <motion.button
                key={index}
                onClick={() => addQuickResponse(response)}
                className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-all duration-200 border border-white/10 hover:border-green-400/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!isOnline}
              >
                {response}
              </motion.button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
            <h4 className="text-sm font-semibold text-green-300 mb-2 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Dicas para Voluntários
            </h4>
            <ul className="text-xs text-green-100 space-y-1">
              <li>• Seja empático e acolhedor</li>
              <li>• Escute sem julgar</li>
              <li>• Ofereça apoio, não soluções</li>
              <li>• Mantenha a confidencialidade</li>
              <li>• Encoraje busca por ajuda profissional quando necessário</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-300 mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Status da Sessão
            </h4>
            <div className="text-xs text-blue-100 space-y-1">
              <p>Mensagens no chat: {messages.length}</p>
              <p>Status: {isOnline ? 'Disponível para ajudar' : 'Fora de serviço'}</p>
              <p>Última atividade: {messages.length > 0 ? formatTime(messages[messages.length - 1]?.timestamp) : 'Nenhuma'}</p>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

export default VolunteerPage;
