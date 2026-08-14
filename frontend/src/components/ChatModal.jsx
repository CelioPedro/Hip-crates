import { useState, useRef, useEffect } from 'react';
import { X, Microphone, PaperPlaneRight, Robot, CalendarPlus } from '@phosphor-icons/react';
import './ChatModal.css';

export default function ChatModal({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Olá! Sou a assistente virtual do Hipócrates. Estou aqui para te acolher. Como posso ajudar com sua saúde hoje?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMsg = { id: Date.now(), type: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        text: 'Entendo perfeitamente o que você está sentindo. Com base no seu relato, recomendo uma consulta com um Neurologista. Encontrei os seguintes horários disponíveis na nossa agenda:',
        hasCarousel: true
      }]);
    }, 1500);
  };

  const handleConfirmAppointment = (time) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text: `Quero agendar para ${time}.`
    }]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        text: `Excelente! Sua consulta está confirmada para ${time}. Você receberá um e-mail com todas as instruções. Há mais alguma coisa em que eu possa ajudar?`
      }]);
    }, 1200);
  };

  return (
    <div className="chat-overlay">
      <div className="chat-modal">
        <div className="chat-header">
          <div className="bot-info">
            <div className="bot-avatar">
              <img src={`${import.meta.env.BASE_URL}Logo01.svg`} alt="Hipócrates.IA Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            </div>
            <div>
              <h3>Triagem Inteligente</h3>
              <p>HIPÓCRATES.IA</p>
            </div>
          </div>
          <button className="chat-close" onClick={onClose} aria-label="Fechar">
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={`msg ${msg.type}`}>
                {msg.text}
              </div>
              {msg.hasCarousel && (
                <div className="appointment-carousel">
                  <div className="slot-card" onClick={() => handleConfirmAppointment('Amanhã, 14:00')}>
                    <div className="date">Amanhã, 15 Jul</div>
                    <div className="time">14:00</div>
                  </div>
                  <div className="slot-card" onClick={() => handleConfirmAppointment('Amanhã, 16:30')}>
                    <div className="date">Amanhã, 15 Jul</div>
                    <div className="time">16:30</div>
                  </div>
                  <div className="slot-card" onClick={() => handleConfirmAppointment('Qua, 17 Jul - 09:00')}>
                    <div className="date">Quarta, 17 Jul</div>
                    <div className="time">09:00</div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="msg ai" style={{ opacity: 0.7 }}>
              <Dots />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <button className="chat-mic" aria-label="Gravar áudio" title="Simular transcrição de áudio">
            <Microphone size={20} weight="fill" />
          </button>
          <input 
            type="text" 
            placeholder="Descreva o que você está sentindo..." 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button className="chat-send" onClick={handleSend} aria-label="Enviar">
            <PaperPlaneRight size={20} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Dots() {
  return (
    <span style={{ letterSpacing: '2px' }}>...</span>
  );
}
