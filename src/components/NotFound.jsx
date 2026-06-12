import React from 'react';

export default function NotFound({ onNavigate }) {
  return (
    <article className="panel" style={{ textAlign: 'center', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div className="error-illustration" style={{
        position: 'relative',
        width: '120px',
        height: '120px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="circle-dashed"></div>
        {/* SVG de Auto (car (2).svg) */}
        <svg className="error-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '60px', height: '60px', zIndex: 2 }}>
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
          <circle cx="7" cy="17" r="2"/>
          <path d="M9 17h6"/>
          <circle cx="17" cy="17" r="2"/>
        </svg>
      </div>

      <span className="panel__step-badge" style={{ background: 'var(--brand-primary-lt)', color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
        Error 404
      </span>
      <h2>Ruta No Encontrada</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '460px', margin: '0' }}>
        El camino que buscas no está en nuestro mapa. El taller sigue abierto, vuelve a la página principal para calcular la cotización del polarizado de tu vehículo.
      </p>

      <div style={{ marginTop: '10px' }}>
        <button type="button" className="btn btn--primary" onClick={() => onNavigate('inicio')}>
          Regresar al Inicio
        </button>
      </div>
    </article>
  );
}
