/**
 * polarizacion.js
 * Lógica de negocio para el servicio de polarizado de vidrios.
 * Define qué piezas existen según la carrocería y los precios por nivel de tinte.
 */

// ── Definición de vidrios por carrocería ────────────────────────────────────

/**
 * Cada pieza: { id, label, icon }
 * icon: emoji representativo para la UI
 */
const VIDRIOS_POR_CARROCERIA = {

  // ── 6 vidrios ──
  Sedan: [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
    { id: 'tras', label: 'Parabrisas trasero',   icon: '🔲' },
    { id: 'lat-del-izq', label: 'Lateral delantero izquierdo', icon: '◻️' },
    { id: 'lat-del-der', label: 'Lateral delantero derecho',   icon: '◻️' },
    { id: 'lat-tras-izq', label: 'Lateral trasero izquierdo',  icon: '◻️' },
    { id: 'lat-tras-der', label: 'Lateral trasero derecho',    icon: '◻️' },
  ],

  Hatchback: [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
    { id: 'tras', label: 'Parabrisas trasero',   icon: '🔲' },
    { id: 'lat-del-izq', label: 'Lateral delantero izquierdo', icon: '◻️' },
    { id: 'lat-del-der', label: 'Lateral delantero derecho',   icon: '◻️' },
    { id: 'lat-tras-izq', label: 'Lateral trasero izquierdo',  icon: '◻️' },
    { id: 'lat-tras-der', label: 'Lateral trasero derecho',    icon: '◻️' },
  ],

  Wagon: [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
    { id: 'tras', label: 'Parabrisas trasero',   icon: '🔲' },
    { id: 'lat-del-izq', label: 'Lateral delantero izquierdo', icon: '◻️' },
    { id: 'lat-del-der', label: 'Lateral delantero derecho',   icon: '◻️' },
    { id: 'lat-tras-izq', label: 'Lateral trasero izquierdo',  icon: '◻️' },
    { id: 'lat-tras-der', label: 'Lateral trasero derecho',    icon: '◻️' },
  ],

  // ── 4 vidrios ──
  Coupe: [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
    { id: 'tras', label: 'Parabrisas trasero',   icon: '🔲' },
    { id: 'lat-izq', label: 'Lateral izquierdo', icon: '◻️' },
    { id: 'lat-der', label: 'Lateral derecho',   icon: '◻️' },
  ],

  Convertible: [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
    { id: 'lat-izq', label: 'Lateral izquierdo', icon: '◻️' },
    { id: 'lat-der', label: 'Lateral derecho',   icon: '◻️' },
    // Sin parabrisas trasero fijo
  ],

  Roadster: [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
    { id: 'lat-izq', label: 'Lateral izquierdo', icon: '◻️' },
    { id: 'lat-der', label: 'Lateral derecho',   icon: '◻️' },
  ],

  // ── SUV / Crossover / Pickup / Off-Road: 6 vidrios principales ──
  SUV: [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
    { id: 'tras', label: 'Luneta trasera',       icon: '🔲' },
    { id: 'lat-del-izq', label: 'Lateral delantero izquierdo', icon: '◻️' },
    { id: 'lat-del-der', label: 'Lateral delantero derecho',   icon: '◻️' },
    { id: 'lat-tras-izq', label: 'Lateral trasero izquierdo',  icon: '◻️' },
    { id: 'lat-tras-der', label: 'Lateral trasero derecho',    icon: '◻️' },
  ],

  Crossover: [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
    { id: 'tras', label: 'Luneta trasera',       icon: '🔲' },
    { id: 'lat-del-izq', label: 'Lateral delantero izquierdo', icon: '◻️' },
    { id: 'lat-del-der', label: 'Lateral delantero derecho',   icon: '◻️' },
    { id: 'lat-tras-izq', label: 'Lateral trasero izquierdo',  icon: '◻️' },
    { id: 'lat-tras-der', label: 'Lateral trasero derecho',    icon: '◻️' },
  ],

  Pickup: [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
    { id: 'tras', label: 'Luneta trasera',       icon: '🔲' },
    { id: 'lat-del-izq', label: 'Ventanilla delantera izquierda', icon: '◻️' },
    { id: 'lat-del-der', label: 'Ventanilla delantera derecha',   icon: '◻️' },
    // Cabina sencilla: solo 4; si es doble cabina agrega traseros:
    { id: 'lat-tras-izq', label: 'Ventanilla trasera izquierda',  icon: '◻️' },
    { id: 'lat-tras-der', label: 'Ventanilla trasera derecha',    icon: '◻️' },
  ],

  'Off-Road': [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
    { id: 'tras', label: 'Luneta trasera',       icon: '🔲' },
    { id: 'lat-del-izq', label: 'Lateral delantero izquierdo', icon: '◻️' },
    { id: 'lat-del-der', label: 'Lateral delantero derecho',   icon: '◻️' },
    { id: 'lat-tras-izq', label: 'Lateral trasero izquierdo',  icon: '◻️' },
    { id: 'lat-tras-der', label: 'Lateral trasero derecho',    icon: '◻️' },
  ],

  // ── Van / Minivan: 8 vidrios ──
  Van: [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
    { id: 'tras', label: 'Luneta trasera',       icon: '🔲' },
    { id: 'lat-del-izq', label: 'Lateral delantero izquierdo',  icon: '◻️' },
    { id: 'lat-del-der', label: 'Lateral delantero derecho',    icon: '◻️' },
    { id: 'lat-med-izq', label: 'Lateral central izquierdo',    icon: '◻️' },
    { id: 'lat-med-der', label: 'Lateral central derecho',      icon: '◻️' },
    { id: 'lat-tras-izq', label: 'Lateral trasero izquierdo',   icon: '◻️' },
    { id: 'lat-tras-der', label: 'Lateral trasero derecho',     icon: '◻️' },
  ],

  Minivan: [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
    { id: 'tras', label: 'Luneta trasera',       icon: '🔲' },
    { id: 'lat-del-izq', label: 'Lateral delantero izquierdo',  icon: '◻️' },
    { id: 'lat-del-der', label: 'Lateral delantero derecho',    icon: '◻️' },
    { id: 'lat-med-izq', label: 'Lateral central izquierdo',    icon: '◻️' },
    { id: 'lat-med-der', label: 'Lateral central derecho',      icon: '◻️' },
    { id: 'lat-tras-izq', label: 'Lateral trasero izquierdo',   icon: '◻️' },
    { id: 'lat-tras-der', label: 'Lateral trasero derecho',     icon: '◻️' },
  ],

  // ── Limusina ──
  Limousine: [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
    { id: 'tras', label: 'Luneta trasera',       icon: '🔲' },
    { id: 'lat-del-izq', label: 'Lateral delantero izquierdo',  icon: '◻️' },
    { id: 'lat-del-der', label: 'Lateral delantero derecho',    icon: '◻️' },
    { id: 'lat-med1-izq', label: 'Lateral zona VIP izquierdo 1', icon: '◻️' },
    { id: 'lat-med1-der', label: 'Lateral zona VIP derecho 1',   icon: '◻️' },
    { id: 'lat-med2-izq', label: 'Lateral zona VIP izquierdo 2', icon: '◻️' },
    { id: 'lat-med2-der', label: 'Lateral zona VIP derecho 2',   icon: '◻️' },
  ],

  // ── Militar / cuerpos especiales: solo parabrisas ──
  Military: [
    { id: 'del', label: 'Parabrisas delantero', icon: '🔲' },
  ],
};

/** Fallback para carrocerías no mapeadas: trato como Sedan */
const FALLBACK_BODY = 'Sedan';

export function getVidriosPorCarroceria(bodyStyle) {
  return VIDRIOS_POR_CARROCERIA[bodyStyle]
    ?? VIDRIOS_POR_CARROCERIA[FALLBACK_BODY];
}

// ── Niveles de tinte ────────────────────────────────────────────────────────

export const NIVELES_TINTE = [
  {
    id: 'claro',
    label: 'Claro 70%',
    descripcion: 'Mínimo oscurecimiento, máxima visibilidad. Reduce UV sin alterar apariencia.',
    color: '#d0e8f5',
  },
  {
    id: 'medio',
    label: 'Medio 35%',
    descripcion: 'Balance entre privacidad y visibilidad. El más popular para clima cálido.',
    color: '#7ab8d8',
  },
  {
    id: 'oscuro',
    label: 'Oscuro 20%',
    descripcion: 'Privacidad real, máximo rechazo de calor. Requiere mayor atención nocturna.',
    color: '#2e6a90',
  },
  {
    id: 'limousine',
    label: 'Limousine 5%',
    descripcion: 'Prácticamente opaco. Solo legal en vidrios traseros según reglamento local.',
    color: '#0d1f2d',
  },
];

// ── Precios base por pieza (MXN) ────────────────────────────────────────────

/**
 * Precio base por tipo de pieza (sin importar nivel de tinte)
 * Los parabrisas cuestan más por superficie y curvatura.
 */
const PRECIO_BASE_PIEZA = (id) => {
  if (id === 'del')  return 900;  // Parabrisas delantero: mayor superficie
  if (id === 'tras') return 750;  // Parabrisas trasero / luneta
  return 450;                      // Laterales
};

/**
 * Multiplicador de precio según nivel de tinte.
 * El film de mayor densidad tiene mayor costo de material.
 */
const MULTIPLICADOR_TINTE = {
  claro:    1.00,
  medio:    1.15,
  oscuro:   1.30,
  limousine:1.50,
};

export function calcularPrecioPieza(vidrio, nivelTinteId) {
  const base = PRECIO_BASE_PIEZA(vidrio.id);
  const mult = MULTIPLICADOR_TINTE[nivelTinteId] ?? 1;
  return Math.round(base * mult);
}

export function calcularCotizacion(selecciones) {
  // selecciones: [{ vidrio, nivelTinteId }]
  let subtotal = 0;
  const desglose = selecciones.map(({ vidrio, nivelTinteId }) => {
    const precio = calcularPrecioPieza(vidrio, nivelTinteId);
    subtotal += precio;
    return { vidrio, nivelTinteId, precio };
  });
  const manoObra = Math.round(selecciones.length * 150); // $150 por pieza de instalación
  const total = subtotal + manoObra;
  return { desglose, subtotal, manoObra, total };
}

// ── Textos para la vista de "en proceso" ────────────────────────────────────

export function tareasDeInstalacion(selecciones) {
  // Retorna un array de tareas con su estado inicial
  return selecciones.map(({ vidrio }, i) => ({
    id: vidrio.id,
    label: `Instalar polarizado en ${vidrio.label.toLowerCase()}`,
    estado: i === 0 ? 'doing' : 'todo', // primera en proceso, resto pendientes
  }));
}
