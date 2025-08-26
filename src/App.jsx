import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import ChatPage from '@/pages/ChatPage';
import VolunteerPage from '@/pages/VolunteerPage';

function App() {
  return (
    <Router>
      <Helmet>
        <title>Open Mind - Plataforma de Apoio à Saúde Mental Escolar</title>
        <meta name="description" content="Plataforma de apoio à saúde mental escolar com chat anônimo, suporte emocional e ferramentas de autoconhecimento para estudantes." />
        <meta property="og:title" content="Open Mind - Plataforma de Apoio à Saúde Mental Escolar" />
        <meta property="og:description" content="Plataforma de apoio à saúde mental escolar com chat anônimo, suporte emocional e ferramentas de autoconhecimento para estudantes." />
      </Helmet>

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
