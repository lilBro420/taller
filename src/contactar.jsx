// Contactar.jsx
import React from 'react';

export default function Contactar({ onEnviar, onBack }) {
  return (
    <article className="panel">
      <div className="panel__header">
        <span className="panel__step-badge">Paso 3: Confirmar Cita</span>
        <h2>💬 Confirmar tu cita por WhatsApp</h2>
      </div>
      <p className="panel__description">
        Estás a un paso de enviar la cotización de tu polarizado directamente al patrón para autorizar el trabajo.
      </p>

      <div className="quote-actions" style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
        <button 
          type="button"
          onClick={onEnviar}
          className="btn btn--success"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontWeight: 'bold' }}
        >
          💬 Enviar al Taller por WhatsApp
        </button>
        <button 
          type="button"
          onClick={onBack}
          className="btn btn--outline"
        >
          ← Regresar a Cotización
        </button>
      </div>
    </article>
  );
}