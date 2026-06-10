import React, { useState, useEffect, useMemo, useRef } from 'react';

import carDetails from './car_details.json';


const ComboSelect = ({ label, options, value, onChange, placeholder = 'Selecciona...', disabled = false }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef(null);
  const searchInputRef = useRef(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return options;
    return options.filter(o => o.label.toLowerCase().includes(q));
  }, [options, search]);

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    if (open && searchInputRef.current) setTimeout(() => searchInputRef.current.focus(), 100);
  }, [open]);

  useEffect(() => {
    const handler = (e) => { if (wrapperRef.current && !wrapperRef.current.contains(e.target)) { setOpen(false); setSearch(''); } };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (val) => {
    if (disabled) return;
    onChange(val);
    setOpen(false);
    setSearch('');
  };

  return (
    <div className="vs-field" ref={wrapperRef}>
      <label className="vs-label">{label}</label>
      <div
        className={`vs-trigger${disabled ? ' vs-trigger--disabled' : ''}${open ? ' vs-trigger--open' : ''}`}
        onClick={() => !disabled && setOpen(o => !o)}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setOpen(o => !o); }
          if (e.key === 'Escape') { setOpen(false); setSearch(''); }
        }}
      >
        <span className={selected ? 'vs-trigger__value' : 'vs-trigger__placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={`vs-trigger__arrow${open ? ' vs-trigger__arrow--up' : ''}`}>▼</span>
      </div>
      {open && !disabled && (
        <div className="vs-dropdown">
          <input ref={searchInputRef} className="vs-search" placeholder="Escribe..." value={search} onChange={e => setSearch(e.target.value)} onClick={e => e.stopPropagation()} />
          <div className="vs-options">
            {filtered.length === 0 ? <div className="vs-option vs-option--empty">Sin resultados</div> :
              filtered.map(o => (
                <div key={o.value} className={`vs-option${o.value === value ? ' vs-option--selected' : ''}`} onClick={() => handleSelect(o.value)}>
                  {o.label}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
const StepDot = ({ num, active, done, label }) => (
  <div className="vs-dot-wrapper">
    <div className={`vs-dot${done ? ' vs-dot--done' : active ? ' vs-dot--active' : ''}`}>
      {done ? '✓' : num}
    </div>
    <span className="vs-dot-label">{label}</span>
  </div>
);

export const VehicleSelector = ({ onVehicleConfirmed }) => {
  const CURRENT_YEAR = new Date().getFullYear();
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [body, setBody] = useState('');

  const brandOptions = useMemo(() => [...new Set(carDetails.map(e => e.brand))].sort().map(b => ({ value: b, label: b })), []);
  const modelOptions = useMemo(() => {
    if (!brand) return [];
    return [...new Set(carDetails.filter(e => e.brand === brand).map(e => e.model))].sort().map(m => ({ value: m, label: m }));
  }, [brand]);
  const carEntry = useMemo(() => (brand && model ? carDetails.find(e => e.brand === brand && e.model === model) : null), [brand, model]);
  const yearOptions = useMemo(() => {
    if (!carEntry) return [];
    const start = carEntry.production_year_start;
    const end = carEntry.production_year_end ?? CURRENT_YEAR;
    let years = [];
    for (let y = end; y >= start; y--) years.push({ value: String(y), label: String(y) });
    return years;
  }, [carEntry, CURRENT_YEAR]);
  const bodyOptions = useMemo(() => (carEntry?.body_styles || []).map(b => ({ value: b, label: b })), [carEntry]);

  const handleBrand = (v) => { setBrand(v); setModel(''); setYear(''); setBody(''); setStep(2); onVehicleConfirmed?.(null); };
  const handleModel = (v) => { setModel(v); setYear(''); setBody(''); setStep(3); onVehicleConfirmed?.(null); };
  const handleYear = (v) => { setYear(v); setBody(''); setStep(4); onVehicleConfirmed?.(null); };
  const handleBody = (v) => {
    setBody(v); setStep(5);
    onVehicleConfirmed?.({ marca: `${brand} ${model}`, modelo: model, anio: year, carroceria: v });
  };
  const handleReset = () => { setBrand(''); setModel(''); setYear(''); setBody(''); setStep(1); onVehicleConfirmed?.(null); };

  return (
    <div className="vs-root">
      <div className="vs-steps-bar">
        {[{ num: 1, label: 'Marca' }, { num: 2, label: 'Modelo' }, { num: 3, label: 'Año' }, { num: 4, label: 'Carrocería' }].map(s => (
          <StepDot key={s.num} num={s.num} label={s.label} active={step === s.num} done={step > s.num} />
        ))}
      </div>
      <div className="vs-fields-grid">
        <ComboSelect label="Marca" options={brandOptions} value={brand} onChange={handleBrand} placeholder="Elige..." />
        <ComboSelect label="Modelo" options={modelOptions} value={model} onChange={handleModel} placeholder="Elige..." disabled={step < 2} />
        <ComboSelect label="Año" options={yearOptions} value={year} onChange={handleYear} placeholder="Elige..." disabled={step < 3} />
        <ComboSelect label="Carrocería" options={bodyOptions} value={body} onChange={handleBody} placeholder="Elige..." disabled={step < 4} />
      </div>
      {step === 5 && (
        <div className="vs-summary-bar">
          <div className="vs-summary-status"><span>✅</span><span>Vehículo seleccionado exitosamente</span></div>
          <div className="vs-summary-details">Vehículo registrado: <strong>{brand} {model} · Año {year} · {body}</strong></div>
          <button className="vs-summary-reset" onClick={handleReset}>↻ Iniciar nueva búsqueda</button>
        </div>
      )}
    </div>
  );
};

export default VehicleSelector;