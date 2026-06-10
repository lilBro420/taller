import { useState, useEffect, useRef, useCallback } from 'react';
import './ImageCarousel.css';

// 1. Importamos las imágenes locales desde la carpeta components
import taller1 from './components/taller1.png';
import taller2 from './components/taller2.png';
import taller3 from './components/taller3.png';
import taller4 from './components/taller4.png';
import taller5 from './components/taller5.png';

// 2. Actualizamos el arreglo para usar las variables importadas
const TALLER_IMAGES = [
  {
    src: taller1,
    alt: 'Vista 1 del taller mecánico',
  },
  {
    src: taller2,
    alt: 'Vista 2 del taller mecánico',
  },
  {
    src: taller3,
    alt: 'Vista 3 del taller mecánico',
  },
  {
    src: taller4,
    alt: 'Vista 4 del taller mecánico',
  },
  {
    src: taller5,
    alt: 'Vista 5 del taller mecánico',
  },
];

export default function ImageCarousel({ images = TALLER_IMAGES, autoPlayMs = 4000 }) {
  const [current, setCurrent]   = useState(0);
  const [animDir, setAnimDir]   = useState('next'); 
  const [isAnimating, setIsAnim] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((idx, dir = 'next') => {
    if (isAnimating) return;
    setAnimDir(dir);
    setIsAnim(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsAnim(false);
    }, 320);
  }, [isAnimating]);

  const next = useCallback(() => {
    goTo((current + 1) % images.length, 'next');
  }, [current, images.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + images.length) % images.length, 'prev');
  }, [current, images.length, goTo]);

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(next, autoPlayMs);
    return () => clearInterval(timerRef.current);
  }, [next, autoPlayMs]);

  const pauseAuto = () => clearInterval(timerRef.current);
  const resumeAuto = () => {
    timerRef.current = setInterval(next, autoPlayMs);
  };

  return (
    <div
      className="carousel"
      onMouseEnter={pauseAuto}
      onMouseLeave={resumeAuto}
      onTouchStart={pauseAuto}
      onTouchEnd={resumeAuto}
    >
      <div className={`carousel__track carousel__track--${animDir} ${isAnimating ? 'carousel__track--animating' : ''}`}>
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="carousel__img"
          draggable={false}
        />
        <div className="carousel__overlay" />
      </div>
      <button className="carousel__btn carousel__btn--prev" onClick={prev} aria-label="Anterior">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="carousel__btn carousel__btn--next" onClick={next} aria-label="Siguiente">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <div className="carousel__dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carousel__dot${i === current ? ' carousel__dot--active' : ''}`}
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            aria-label={`Imagen ${i + 1}`}
          />
        ))}
      </div>
      <span className="carousel__counter">{current + 1} / {images.length}</span>
    </div>
  );
}