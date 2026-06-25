import { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import VehicleSelector from './components/VehicleSelector';
import NotFound from './components/NotFound';
import {
  getVidriosPorCarroceria,
  NIVELES_TINTE,
  calcularCotizacion,
  tareasDeInstalacion,
} from './polarizacion';
import carIcon from './assets/car (2).svg';
import drillIcon from './assets/drill.svg';
import gridIcon from './assets/grid-2x2.svg';
import mapPinIcon from './assets/map-pin (1).svg';
import phoneIcon from './assets/phone (1).svg';
import searchIcon from './assets/search.svg';
import './App.css';
import './components/VehicleSelector.css';

import taller1 from './components/taller1.png';
import taller2 from './components/taller2.png';
import taller3 from './components/taller3.png';
import taller4 from './components/taller4.png';
import taller5 from './components/taller5.png';

const tallerImages = [taller1, taller2, taller3, taller4, taller5];

function WorkshopGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tallerImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const imageLabels = [
    "Amplio taller con elevadores hidráulicos e iluminación industrial",
    "Materiales de alta calidad y personal capacitado",
    "Equipamiento de vanguardia para un polarizado impecable",
    "Espacio limpio y climatizado para el curado óptimo de la película",
    "Comprometidos con brindarte el mejor servicio y garantía"
  ];

  return (
    <div className="workshop-gallery" style={{ marginTop: '28px' }}>
      <h4 style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--brand-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px', borderBottom: '2px solid var(--brand-yellow)', display: 'inline-block', paddingBottom: '4px' }}>
        📷 Nuestras Instalaciones
      </h4>
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          height: '360px', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          border: '1px solid var(--border)',
          boxShadow: isHovered ? '0 12px 24px rgba(4,67,130,0.15)' : 'var(--shadow-sm)',
          position: 'relative',
          cursor: 'pointer',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <img 
          src={tallerImages[currentIndex]} 
          alt={`Instalación del taller ${currentIndex + 1}`} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }} 
        />
        
        {/* Glassmorphic overlay at the bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(13, 34, 51, 0.9) 0%, rgba(13, 34, 51, 0.4) 70%, rgba(13, 34, 51, 0) 100%)',
          padding: '24px 20px 16px',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          opacity: 1,
          transition: 'opacity 0.3s'
        }}>
          <span style={{ fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.01em', textShadow: '0 1px 3px rgba(0,0,0,0.8)', lineHeight: '1.4' }}>
            {imageLabels[currentIndex]}
          </span>
        </div>

        {/* Manual navigation buttons visible on hover */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev - 1 + tallerImages.length) % tallerImages.length);
          }}
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            color: 'var(--brand-primary)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: isHovered ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            transition: 'background 0.2s'
          }}
          title="Anterior"
        >
          ‹
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev + 1) % tallerImages.length);
          }}
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            color: 'var(--brand-primary)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: isHovered ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            transition: 'background 0.2s'
          }}
          title="Siguiente"
        >
          ›
        </button>
      </div>
      
      {/* Indicator dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '14px' }}>
        {tallerImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: currentIndex === idx ? '18px' : '8px',
              height: '8px',
              borderRadius: '9999px',
              backgroundColor: currentIndex === idx ? 'var(--brand-primary)' : 'var(--border-strong)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            title={`Ver imagen ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const VEHICLE_EMPTY = {
  folio: '',
  marca: '',
  modelo: '',
  anio: '',
  carroceria: '',
  motor: '',
  transmision: '',
};

const ORDEN_EMPTY = {
  selecciones: [],
  cotizacion: null,
  autorizado: null,
  tareas: [],
};

export default function App() {
  const getInitialView = () => {
    const path = window.location.pathname;
    if (path === '/') return 'inicio';
    if (path === '/recepcion') return 'recepcion';
    if (path === '/cotizacion') return 'cotizacion';
    if (path === '/agradecimiento') return 'agradecimiento';
    return 'notfound';
  };

  const [vistaActual, setVistaActual]       = useState(getInitialView);
  const [activeFaq, setActiveFaq]           = useState(null);
  const [vehicle, setVehicle]               = useState(VEHICLE_EMPTY);
  const [orden, setOrden]                   = useState(ORDEN_EMPTY);
  const [recepcionError, setRecepcionError] = useState('');

  const navigate = (v) => {
    setVistaActual(v);
    const path = v === 'inicio' ? '/' : `/${v}`;
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  };

  const toggleFaq = (i) => setActiveFaq(a => (a === i ? null : i));

  const resetFlow = (targetView = 'inicio') => {
    navigate(targetView);
    setVehicle(VEHICLE_EMPTY);
    setOrden(ORDEN_EMPTY);
    setRecepcionError('');
    setActiveFaq(null);
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/') setVistaActual('inicio');
      else if (path === '/recepcion') setVistaActual('recepcion');
      else if (path === '/cotizacion') setVistaActual('cotizacion');
      else if (path === '/agradecimiento') setVistaActual('agradecimiento');
      else setVistaActual('notfound');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // ── Selección de vidrios ─────────────────────────────────────────────────

  const [vidriosDisponibles, setVidriosDisponibles] = useState([]);

  useEffect(() => {
    const cargarVidrios = async () => {
      if (vehicle.carroceria) {
        try {
          const vidrios = await getVidriosPorCarroceria(vehicle.carroceria);
          setVidriosDisponibles(vidrios);
        } catch (error) {
          console.error("Error al cargar los vidrios de la carrocería:", error);
        }
      } else {
        setVidriosDisponibles([]);
      }
    };
    cargarVidrios();
  }, [vehicle.carroceria]);

  const toggleVidrio = (vidrio) => {
    const existe = orden.selecciones.find(s => s.vidrio.id === vidrio.id);
    if (existe) {
      setOrden(o => ({ ...o, selecciones: o.selecciones.filter(s => s.vidrio.id !== vidrio.id) }));
    } else {
      setOrden(o => ({ ...o, selecciones: [...o.selecciones, { vidrio, nivelTinteId: 'medio' }] }));
    }
  };

  const setNivelTinte = (vidrioId, nivelId) => {
    setOrden(o => ({
      ...o,
      selecciones: o.selecciones.map(s =>
        s.vidrio.id === vidrioId ? { ...s, nivelTinteId: nivelId } : s
      ),
    }));
  };

  // ── Avanzar a cotización ─────────────────────────────────────────────────

  const handleIrACotizacion = async (e) => {
    e.preventDefault();
    if (!vehicle.marca) {
      setRecepcionError('Primero selecciona el vehículo con el selector.');
      return;
    }
    if (orden.selecciones.length === 0) {
      setRecepcionError('Selecciona al menos un vidrio a polarizar.');
      return;
    }
    setRecepcionError('');
    try {
      const cotizacion = await calcularCotizacion(orden.selecciones);
      setOrden(o => ({ ...o, cotizacion }));
      navigate('cotizacion');
    } catch (error) {
      console.error("Error al calcular la cotización:", error);
      setRecepcionError('Ocurrió un error al calcular la cotización. Inténtalo de nuevo.');
    }
  };

  const handleEnviarAWhatsApp = () => {
    const telefonoTaller = "526531610325"; // Código de país 52 (México) + tu número

    // 1. Encabezado del mensaje con los datos del carro
    let mensaje = `¡Hola, Polarizados Javiercito! \n` +
                  `Me interesa autorizar la siguiente cotización:\n\n` +
                  ` *Vehículo:* ${vehicle.marca} ${vehicle.modelo} (${vehicle.anio})\n` +
                  ` *Carrocería:* ${vehicle.carroceria}\n\n` +
                  ` *DESGLOSE DE PIEZAS:*\n` +
                  `-----------------------------\n`;

    // 2. Mapeamos cada pieza con su tinte y precio al mensaje de texto
    orden.cotizacion.desglose.forEach(({ vidrio, nivelTinteId, precio }) => {
      const nivel = NIVELES_TINTE.find(n => n.id === nivelTinteId);
      mensaje += `• ${vidrio.label} [${nivel?.label || 'Sin tinte'}]: $${precio.toLocaleString()} MXN\n`;
    });

    // 3. Añadimos mano de obra y el gran total estimado
    mensaje += `-----------------------------\n` +
               ` *Mano de obra:* $${orden.cotizacion.manoObra.toLocaleString()} MXN\n` +
               ` *TOTAL ESTIMADO:* $${orden.cotizacion.total.toLocaleString()} MXN\n\n` +
               `¿Cuándo podría pasar a dejar el carro con ustedes?`;

    // 4. Formateamos el texto para que sea seguro ponerlo en un enlace web
    const mensajeFormateado = encodeURIComponent(mensaje);
    const urlWhatsapp = `https://wa.me/${telefonoTaller}?text=${mensajeFormateado}`;

    // 5. Abrimos WhatsApp en una pestaña nueva
    window.open(urlWhatsapp, '_blank');

    // 6. Avanzar a 'agradecimiento'
    navigate('agradecimiento');
  };

  // ── Breadcrumb ───────────────────────────────────────────────────────────

  const getBreadcrumbItems = () => {
    const go = (v) => (e) => { e.preventDefault(); navigate(v); };
    const home       = { label: 'Inicio',     onClick: go('inicio') };
    const recepcion  = { label: 'Recepción',  onClick: go('recepcion') };
    const cotizacion = { label: 'Cotización', onClick: go('cotizacion') };
    const gracias    = { label: 'Agradecimiento', onClick: go('agradecimiento') };

    switch (vistaActual) {
      case 'inicio':         return [home];
      case 'recepcion':      return [home, recepcion];
      case 'cotizacion':     return [home, recepcion, cotizacion];
      case 'agradecimiento': return [home, recepcion, cotizacion, gracias];
      case 'notfound':       return [home, { label: 'Error 404' }];
      default:               return [home];
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="app">

      {/* ── HEADER ── */}
      <header className="app__header">
        <div className="header__brand">
          <div className="header__logo" onClick={() => resetFlow('inicio')} style={{ cursor: 'pointer' }} title="Ir al inicio">
            <img src={drillIcon} alt="Logo" className="header-logo-svg" />
          </div>
          <div className="header__text">
            <h1>Taller de Polarizados El Javiercito</h1>
            <p>Especialistas en polarizado de vidrios • San Luis Río Colorado, Sonora</p>
          </div>
        </div>
        <div className="header__contact">
          <span>
            <img src={mapPinIcon} alt="" className="header-icon" />
            Avenida Revolucion y 22
          </span>
          <a href="tel:6531112233" className="header__phone">
            <img src={phoneIcon} alt="" className="header-icon" />
            (+52) 653 111 2233
          </a>
        </div>
      </header>

      <Breadcrumb items={getBreadcrumbItems()} maxItems={5} />

      <div className="app__layout">
        <main className="app__main">

          {/* ══════════════════════════════════════════════════════════════
              INICIO
          ══════════════════════════════════════════════════════════════ */}
          {vistaActual === 'inicio' && (
            <article className="panel panel--landing" style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: 0 }}>
              <div className="landing__three-col" style={{ background: 'var(--surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>

                {/* ── Columna izquierda: reseñas ── */}
                <div className="landing__col--left" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <span className="col-section-title" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '8px' }}> RESEÑAS</span>
                  
                  {/* Resumen de Calificación */}
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '4px' }}>Años de experiencia</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-hint)' }}>Miles de Clientes Satisfechos</span>
                  </div>

                  {[
                    { ini: 'R', nombre: 'Rosa M.',   tiempo: 'Hace 1 semana',  estrellas: '⭐⭐⭐⭐⭐', comentario: '"El polarizado de mi Corolla quedó perfecto. Sin burbujas, tono parejo. Muy recomendado."' },
                    { ini: 'C', nombre: 'Carlos H.', tiempo: 'Hace 3 semanas', estrellas: '⭐⭐⭐⭐⭐', comentario: '"Hice mi Ram 1500 completa. El trabajo limpio y la película se ve de primera calidad."' },
                    { ini: 'L', nombre: 'Laura G.',  tiempo: 'Hace 2 meses',   estrellas: '⭐⭐⭐⭐⭐', comentario: '"Rápido, limpio y el precio justo. Tardé solo 2 horas para los 6 vidrios del Jetta."' },
                  ].map((r, i) => (
                    <div className="review-card" key={i} style={{ boxShadow: 'var(--shadow-sm)' }}>
                      <div className="review-header">
                        <div className="review-avatar">{r.ini}</div>
                        <div className="review-meta"><h4>{r.nombre}</h4><span>{r.tiempo}</span></div>
                      </div>
                      <div className="review-stars">{r.estrellas}</div>
                      <p className="review-comment" style={{ fontSize: '0.75rem', lineHeight: '1.45' }}>{r.comentario}</p>
                    </div>
                  ))}
                </div>

                {/* ── Columna central: acciones ── */}
                <div className="landing__col--center" style={{ padding: '24px' }}>
                  
                  {/* Título y descripción del servicio */}
                  <div className="service-intro" style={{ marginBottom: '20px' }}>
                    <h2 style={{ color: 'var(--brand-primary)', fontWeight: 'bold', fontSize: '1.45rem', margin: '0 0 6px' }}>
                      Servicio de Polarizado de Vidrios
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                      Instalación profesional de película de control solar. Rechaza el calor, protege de rayos UV y da privacidad real a tu vehículo. Garantía de por vida en materiales.
                    </p>
                  </div>

                  {/* Galería / Carrusel de fotos de taller */}
                  <WorkshopGallery />

                  {/* Tarjeta destacada */}
                  <div className="card-action" style={{ background: '#f0f7fc', border: '1px solid var(--border)', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: 'none', marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="card-action__icon" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={gridIcon} alt="" className="card-icon-svg" style={{ width: '32px', height: '32px' }} />
                      </div>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: 'var(--brand-primary)', margin: '4px 0 0' }}>
                      Nuevo Servicio de Polarizado
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: 0 }}>
                      Registra tu vehículo y elige qué vidrios deseas polarizar con cotización inmediata.
                    </p>
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() => { setVehicle(VEHICLE_EMPTY); setOrden(ORDEN_EMPTY); navigate('recepcion'); }}
                      style={{ padding: '12px', fontSize: '0.95rem', fontWeight: 'bold', background: 'var(--brand-primary)', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.2s', marginTop: '6px' }}
                    >
                      Iniciar cotización
                    </button>
                  </div>
                </div>

                {/* ── Columna derecha: precios orientativos ── */}
                <div className="landing__col--right" style={{ padding: '24px 20px' }}>
                  <span className="col-section-title" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>PRECIOS ORIENTATIVOS</span>
                  {[
                    { titulo: 'Parabrisas delantero',         rango: '$900 – $1,350',   nota: 'Precio según nivel de tinte' },
                    { titulo: 'Parabrisas / Luneta trasera',  rango: '$750 – $1,125',   nota: '' },
                    { titulo: 'Vidrio lateral (c/u)',         rango: '$450 – $675',     nota: 'x2 delanteros · x2-4 traseros' },
                    { titulo: 'Paquete Sedan completo',       rango: '$3,600 – $5,400', nota: '6 piezas + instalación' },
                    { titulo: 'Paquete Coupe completo',       rango: '$2,550 – $3,825', nota: '4 piezas + instalación' },
                    { titulo: 'Paquete Van / Minivan',        rango: '$5,250 – $7,875', nota: '8 piezas + instalación' },
                  ].map((p, i) => (
                    <div
                      className="price-card price-card--clickable"
                      key={i}
                      onClick={() => { setVehicle(VEHICLE_EMPTY); setOrden(ORDEN_EMPTY); navigate('recepcion'); }}
                      style={{ cursor: 'pointer', background: '#ffffff', marginBottom: '8px' }}
                      title="Iniciar cotización"
                    >
                      <h4>{p.titulo}</h4>
                      <div><span className="price-card__amount" style={{ color: 'var(--brand-primary)' }}>{p.rango}</span><span className="price-card__currency"> MXN</span></div>
                      {p.nota && <p className="price-card__note">{p.nota}</p>}
                    </div>
                  ))}
                  <p className="price-disclaimer">Precios orientativos. El total exacto se calcula al elegir piezas y nivel de tinte en la cotización.</p>
                </div>
              </div>

              {/* FAQ al fondo de la sección, ancho completo */}
              <div className="landing__faq-area" style={{ marginTop: '20px', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', padding: '24px 30px', boxShadow: 'var(--shadow-sm)' }}>
                <span className="col-section-title" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>PREGUNTAS FRECUENTES</span>
                <div className="faq-accordion" style={{ marginTop: '12px' }}>
                  {[
                    { q: '¿Cuánto tarda la instalación?',    a: 'Entre 1 y 3 horas según la cantidad de vidrios. Vidrios completos (6 piezas) en promedio 2.5 horas.' },
                    { q: '¿Qué nivel de tinte es legal?',    a: 'El reglamento en Sonora permite hasta 35% en laterales traseros y luneta. El parabrisas delantero solo admite película UV transparente (70%). Te asesoramos en taller.' },
                    { q: '¿Tiene garantía el polarizado?',   a: 'Sí. Garantía de por vida contra burbujas, decoloración y despegue de película en condiciones normales de uso.' },
                    { q: '¿Puedo lavar el carro después?',   a: 'Recomendamos esperar 5 días antes del primer lavado interior de cristales para que el adhesivo cure completamente.' },
                    { q: '¿Puedo elegir distintos tonos?',   a: 'Sí, en nuestra cotización puedes asignar un nivel de tinte diferente a cada pieza según tus necesidades.' },
                  ].map((faq, i) => {
                    const isOpen = activeFaq === i;
                    return (
                      <div key={i} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
                        <button type="button" className="faq-item__trigger" onClick={() => toggleFaq(i)} aria-expanded={isOpen}>
                          <span>{faq.q}</span>
                          <span className="faq-item__arrow">{isOpen ? '−' : '+'}</span>
                        </button>
                        <div className="faq-item__panel" hidden={!isOpen}>
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          )}

          {/* ══════════════════════════════════════════════════════════════
              RECEPCIÓN — Paso 1
          ══════════════════════════════════════════════════════════════ */}
          {vistaActual === 'recepcion' && (
            <article className="panel">
              <div className="panel__header">
                <span className="panel__step-badge">Paso 1: Recepción</span>
                <h2>Datos del Vehículo y Vidrios a Polarizar</h2>
              </div>
              <p className="panel__description">
                Selecciona el vehículo y marca los vidrios que deseas polarizar. El sistema ajusta
                las opciones automáticamente según el tipo de carrocería.
              </p>

              <form className="form-intake" onSubmit={handleIrACotizacion}>
                <div className="form-intake__sections">

                  {/* ── Sección 1: Datos del vehículo ── */}
                  <div className="form-section">
                    <h3 className="form-section__title">
                      <img src={carIcon} alt="" className="title-icon-svg" />
                      Datos del Vehículo
                    </h3>
                    
                    <VehicleSelector
                      onVehicleConfirmed={(sel) => {
                        if (!sel) {
                          setVehicle(VEHICLE_EMPTY);
                          setOrden(ORDEN_EMPTY);
                          return;
                        }
                        setVehicle(v => ({
                          ...v,
                          marca:       sel.marca,
                          modelo:      sel.modelo,
                          anio:        sel.anio,
                          carroceria:  sel.carroceria,
                          motor:       sel.motor       || '',
                          transmision: sel.transmision || '',
                        }));
                        setOrden(ORDEN_EMPTY);
                      }}
                    />
                  </div>

                  {/* ── Sección 2: Vidrios a polarizar ── */}
                  {vehicle.carroceria && (
                    <div className="form-section">
                      <div className="vidrios-header">
                        <span className="vidrios-header__title">
                          <img src={gridIcon} alt="" className="title-icon-svg" />
                          Vidrios a Polarizar
                          <span className="vidrios-header__subtitle">
                            — {vehicle.carroceria} ({vidriosDisponibles.length} piezas)
                          </span>
                        </span>

                        {/* Accesos rápidos */}
                        <div className="vidrios-accesos">
                          <button
                            type="button"
                            className="btn btn--sm btn--outline"
                            onClick={() => setOrden(o => ({
                              ...o,
                              selecciones: vidriosDisponibles.map(v => ({ vidrio: v, nivelTinteId: 'medio' }))
                            }))}
                          >
                            Seleccionar todos
                          </button>
                          <button
                            type="button"
                            className="btn btn--sm btn--outline"
                            onClick={() => setOrden(o => ({ ...o, selecciones: [] }))}
                          >
                            Limpiar selección
                          </button>
                        </div>
                      </div>

                      {/* Lista de vidrios */}
                      <div className="vidrios-lista">
                        {vidriosDisponibles.map((vidrio) => {
                          const sel = orden.selecciones.find(s => s.vidrio.id === vidrio.id);
                          const isSelected = !!sel;
                          return (
                            <div
                              key={vidrio.id}
                              className={`vidrio-item${isSelected ? ' vidrio-item--active' : ''}`}
                            >
                              {/* Columna izquierda: checkbox + nombre */}
                              <label className="vidrio-item__check-label">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleVidrio(vidrio)}
                                  className="vidrio-item__checkbox"
                                />
                                <span className="vidrio-item__icon">{vidrio.icon}</span>
                                <span className="vidrio-item__nombre">{vidrio.label}</span>
                              </label>

                              {/* Columna derecha: botones de tinte (siempre visibles) */}
                              <div className={`vidrio-item__tinte${!isSelected ? ' vidrio-item__tinte--disabled' : ''}`}>
                                {NIVELES_TINTE.map(nivel => (
                                  <button
                                    key={nivel.id}
                                    type="button"
                                    title={nivel.descripcion}
                                    disabled={!isSelected}
                                    className={`tinte-btn${isSelected && sel.nivelTinteId === nivel.id ? ' tinte-btn--active' : ''}`}
                                    style={{ '--tinte-color': nivel.color }}
                                    onClick={() => isSelected && setNivelTinte(vidrio.id, nivel.id)}
                                  >
                                    <span className="tinte-btn__swatch" />
                                    <span className="tinte-btn__label">{nivel.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Resumen rápido */}
                      {orden.selecciones.length > 0 && (
                        <div className="vidrios-resumen">
                          <strong>
                            {orden.selecciones.length} vidrio{orden.selecciones.length > 1 ? 's' : ''} seleccionado{orden.selecciones.length > 1 ? 's' : ''}
                          </strong>
                          {' · '}
                          {orden.selecciones.map(s => {
                            const nivel = NIVELES_TINTE.find(n => n.id === s.nivelTinteId);
                            return `${s.vidrio.label} (${nivel?.label ?? s.nivelTinteId})`;
                          }).join(' · ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {recepcionError && (
                  <span className="search-form__error" style={{ marginTop: 4 }}>{recepcionError}</span>
                )}

                <button type="submit" className="btn btn--primary btn--block">
                  Ver Cotización →
                </button>
              </form>
            </article>
          )}

          {/* ══════════════════════════════════════════════════════════════
              COTIZACIÓN — Paso 2
          ══════════════════════════════════════════════════════════════ */}
{vistaActual === 'cotizacion' && orden.cotizacion && (
  <article className="panel">
    <div className="panel__header">
      <span className="panel__step-badge">Paso 2: Cotización</span>
      <h2>Resumen y Cotización de Polarizado</h2>
    </div>

    <div className="vehicle-info-strip">
      <span>Vehículo: <strong>{vehicle.marca} {vehicle.modelo} ({vehicle.anio})</strong></span>
      <span>Carrocería: <strong>{vehicle.carroceria}</strong></span>
    </div>

    <div className="quote-sheet">
      <h3>Desglose por pieza</h3>
      <div className="quote-sheet__grid">
        <div className="quote-table">
          {orden.cotizacion.desglose.map(({ vidrio, nivelTinteId, precio }) => {
            const nivel = NIVELES_TINTE.find(n => n.id === nivelTinteId);
            return (
              <div className="quote-table__row" key={vidrio.id}>
                <span>
                  {vidrio.label}
                  <span className="quote-tinte-badge" style={{ background: nivel?.color }}>
                    {nivel?.label}
                  </span>
                </span>
                <strong>${precio.toLocaleString()} MXN</strong>
              </div>
            );
          })}
          <div className="quote-table__row">
            <span>Mano de obra e instalación ({orden.selecciones.length} piezas)</span>
            <strong>${orden.cotizacion.manoObra.toLocaleString()} MXN</strong>
          </div>
          <div className="quote-table__row quote-table__row--total">
            <span>Total estimado:</span>
            <strong>${orden.cotizacion.total.toLocaleString()} MXN</strong>
          </div>
        </div>

        <div className="quote-info">
          <p><strong>Tiempo estimado:</strong> {Math.ceil(orden.selecciones.length * 0.4)} – {Math.ceil(orden.selecciones.length * 0.5)} horas</p>
          <p><strong>Garantía:</strong> De por vida contra burbujas y desprendimiento.</p>
          <p><strong>Cuidado post-instalación:</strong> Esperar 5 días antes de limpiar interior de cristales.</p>
          <p><strong>Nota legal:</strong> El parabrisas delantero solo admite película transparente UV (70%). Los demás vidrios según preferencia y reglamento local.</p>
        </div>
      </div>
    </div>

    <div className="quote-actions">
      <button type="button" className="btn btn--success" onClick={handleEnviarAWhatsApp}>
        💬 Enviar Cotización por WhatsApp
      </button>
      <button type="button" className="btn btn--outline" onClick={() => navigate('recepcion')}>
        ← Modificar selección
      </button>
      <button type="button" className="btn btn--danger" onClick={() => resetFlow('inicio')}>
        Cancelar
      </button>
    </div>
  </article>
)}

          {/* ══════════════════════════════════════════════════════════════
              AGRADECIMIENTO — Paso 3
          ══════════════════════════════════════════════════════════════ */}
          {vistaActual === 'agradecimiento' && (
            <article className="panel panel--success" style={{ textAlign: 'center', padding: '40px' }}>
              <div className="success-banner" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="success-banner__icon" style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</span>
                <h2>¡Gracias por contactarnos!</h2>
                <p style={{ fontSize: '1.1rem', marginTop: '8px', color: 'var(--text-secondary)' }}>
                  Tu cotización ha sido enviada exitosamente por WhatsApp al taller.
                </p>
                <p style={{ fontSize: '0.95rem', marginTop: '4px', color: 'var(--text-hint)' }}>
                  El patrón revisará los detalles y te responderá a la brevedad.
                </p>
              </div>

              <div style={{ marginTop: '32px' }}>
                <button type="button" className="btn btn--primary" onClick={() => resetFlow('inicio')}>
                   Registrar Nuevo Servicio
                </button>
              </div>
            </article>
          )}

          {/* Ruta comodín (*) / Fallback para rutas no existentes */}
          {!['inicio', 'recepcion', 'cotizacion', 'agradecimiento'].includes(vistaActual) && (
            <NotFound onNavigate={resetFlow} />
          )}

        </main>
      </div>

      {/* ── WHATSAPP FAB ── */}
      <a
        href="https://wa.me/526531112233?text=Hola,%20quiero%20información%20sobre%20el%20polarizado%20de%20vidrios"
        className="whatsapp-fab"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        title="Contactar al taller por WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <footer className="app__footer">
        <p>© {new Date().getFullYear()} Taller de Polarizados El Javiercito — Servicio de Polarizado. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}