import React, { useState } from 'react';
import { Heart, Stethoscope, IdentificationBadge, Star, VideoCamera } from '@phosphor-icons/react';
import './ProfessionalCard.css';

export default function ProfessionalCard({ doc, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);

  React.useEffect(() => {
    // Reset state every time the card opens or the doctor changes
    if (doc) {
      setIsExpanded(false);
    }
  }, [doc]);

  if (!doc) return null;

  const handleAction = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      // Mock action for starting consultation
      console.log('Iniciando triagem com', doc.name);
      onClose(); // Close the modal for now
    }
  };

  return (
    <div className={`professional-card-overlay-bg ${doc ? 'open' : ''}`} onClick={onClose}>
      <div 
        className={`professional-card ${!isExpanded ? 'professional-card--split' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="professional-card__image-container">
          <img
            className="professional-card__image"
            src={isExpanded ? doc.bgImg : doc.img}
            alt={doc.name}
          />
        </div>
        
        {/* Overlay is always present but opacity varies via CSS transition */}
        <div className="professional-card__overlay"></div>
        
        <button className="professional-card__favorite-btn professional-card__favorite-btn--glass" aria-label="Favoritar">
          <Heart size={20} weight={isExpanded ? "fill" : "regular"} />
        </button>

        <div className="professional-card__content">
          <h2 className="professional-card__title">
            {isExpanded ? doc.specialty : doc.name}
          </h2>
          <p className="professional-card__class">
            {isExpanded ? "Avaliação clínica de ponta, suportada por inteligência preditiva." : doc.specialty}
          </p>
          
          <div className="professional-card__details">
            <div className="professional-card__detail-item">
              <IdentificationBadge size={16} />
              <span>CRM <strong>{Math.floor(Math.random() * 80000) + 10000}</strong></span>
            </div>
            
            {!isExpanded ? (
              <div className="professional-card__detail-item">
                <Star size={16} weight="fill" color="#f59e0b" />
                <span><strong>4.9</strong> / 5.0</span>
              </div>
            ) : (
              <div className="professional-card__detail-item">
                <VideoCamera size={16} />
                <span>Atendimento <strong>Online</strong></span>
              </div>
            )}
          </div>
          
          <div className="professional-card__actions">
            <button className="professional-card__search-btn" onClick={handleAction}>
              {isExpanded ? "Iniciar Triagem" : "Ver Especialidades"}
            </button>
            {!isExpanded && (
              <button className="professional-card__favorite-btn" aria-label="Favoritar">
                <Heart size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
