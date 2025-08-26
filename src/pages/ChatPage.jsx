import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Heart, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function ChatPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName] = useState(`Anônimo${Math.floor(Math.random() * 1000)}`);
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

    // Add welcome message if no messages exist
    const welcomeMessage = {
      id: Date.now(),
      text: "Bem-vindo ao chat de apoio! Este é um espaço seguro e anônimo. Como você está se sentindo hoje?",
      sender: "Sistema",
      timestamp: new Date().toISOString(),
      isSystem: true
    };

    if (!savedMessages || JSON.parse(savedMessages).length === 0) {
      setMessages([welcomeMessage]);
      localStorage.setItem('openMindMessages', JSON.stringify([welcomeMessage]));
    }

    // Listen for new messages from volunteers
    const handleStorageChange = (e) => {
      if (e.key === 'openMindMessages') {
        const updatedMessages = JSON.parse(e.newValue || '[]');
        setMessages(updatedMessages);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: userName,
      timestamp: new Date().toISOString(),
      isSystem: false
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('openMindMessages', JSON.stringify(updatedMessages));
    setNewMessage('');

    toast({
      title: "Mensagem enviada!",
      description: "Sua mensagem foi compartilhada com segurança.",
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header 
        className="glass-effect border-b border-white/20 p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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
              <h1 className="text-xl font-bold text-white">Chat de Apoio Anônimo</h1>
              <p className="text-sm text-blue-200">Você está conectado como {userName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-green-300">
            <div className="w-2 h-2 bg-green-400 rounded-full pulse-animation"></div>
            <span className="text-sm">Online</span>
          </div>
        </div>
      </motion.header>

      {/* Safety Notice */}
      <motion.div 
        className="bg-blue-500/20 border border-blue-400/30 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 text-blue-100">
            <Shield className="w-5 h-5 text-blue-300" />
            <p className="text-sm">
              <strong>Espaço Seguro:</strong> Suas conversas são anônimas e privadas. 
              Não coletamos dados pessoais. Se você está em crise, procure ajuda profissional imediatamente.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === userName ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl chat-bubble ${ 
                  message.isSystem 
                    ? 'bg-orange-500/20 border border-orange-400/30 text-orange-100'
                    : message.sender === userName
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                    : 'glass-effect text-white'
                }`}>
                  {!message.isSystem && (
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-current rounded-full"></div>
                      <span className="text-xs opacity-75">{message.sender}</span>
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
                  placeholder="Digite sua mensagem... (Pressione Enter para enviar)"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-blue-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  rows="2"
                />
              </div>
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-2xl px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Support Info */}
      <motion.div 
        className="bg-green-500/20 border-t border-green-400/30 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-6 text-green-100 text-sm">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-green-300" />
              <span>Apoio 24/7</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-green-300" />
              <span>Voluntários Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-300" />
              <span>100% Anônimo</span>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

export default ChatPage;
