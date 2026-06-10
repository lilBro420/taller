{vistaActual === 'inicio' && (
  <article className="panel panel--landing">

    {/* ── Hero strip — full width ── */}
    <div className="landing__hero-strip">
      <h2>Seguimiento de Reparaciones de Transmisión</h2>
      <p>
        Taller familiar tradicional altamente capacitado. Traiga su carro cuando escuche sonar la transmisión.
        No agendamos citas en línea ni apartamos piezas.
      </p>
    </div>

    {/* ── 3 columnas: reseñas | acciones+FAQ | precios ── */}
    <div className="landing__three-col">

      {/* ── COLUMNA IZQUIERDA: Reseñas ── */}
      <div className="landing__col--left">
        <span className="col-section-title">Google Reviews</span>

        <div className="review-card">
          <div className="review-header">
            <div className="review-avatar">M</div>
            <div className="review-meta">
              <h4>María Elena R.</h4>
              <span>Hace 2 semanas</span>
            </div>
          </div>
          <div className="review-stars">★★★★★</div>
          <p className="review-comment">
            "Mi Sentra patinaba en las subidas. El Wero me explicó el diagnóstico antes de meter mano y la garantía la cumplió."
          </p>
        </div>

        <div className="review-card">
          <div className="review-header">
            <div className="review-avatar">J</div>
            <div className="review-meta">
              <h4>Jorge Luis T.</h4>
              <span>Hace 1 mes</span>
            </div>
          </div>
          <div className="review-stars">★★★★★</div>
          <p className="review-comment">
            "Llevé una RAM con la transmisión tronada. Presupuesto transparente y la camioneta jala al 100."
          </p>
        </div>

        <div className="review-card">
          <div className="review-header">
            <div className="review-avatar">A</div>
            <div className="review-meta">
              <h4>Ana Patricia V.</h4>
              <span>Hace 3 meses</span>
            </div>
          </div>
          <div className="review-stars">★★★★☆</div>
          <p className="review-comment">
            "Cambio de aceite de transmisión. Me cobraron lo justo y no inventaron fallas extras."
          </p>
        </div>
      </div>

      {/* ── COLUMNA CENTRAL: Acciones + FAQ ── */}
      <div className="landing__col--center">

        {/* Acciones */}
        <div className="landing__actions-area">
          <div className="panel__grid">
            <div className="card-action">
              <div className="card-action__icon">🚗</div>
              <h3>Ingreso de Vehículo</h3>
              <p>Inicia el registro del carro que acaba de llegar al taller para iniciar su diagnóstico.</p>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  setVehicle({
                    folio: '5920',
                    marca: '', modelo: '', anio: '',
                    transmision: 'Automática',
                    sintomas: [], sintomaOtro: '',
                    codigos: [], causasProbables: [],
                    detallesDiagnostico: '', tipoDiagnostico: '',
                    pendienteFisico: false, reparable: true,
                    presupuesto: { refacciones: 0, aceite: 0, rectificacion: 0, manoObra: 0, total: 0 },
                    autorizado: null, progreso: 0
                  });
                  navigate('recepcion');
                }}
              >
                Registrar Entrada
              </button>
            </div>

            <div className="card-action">
              <div className="card-action__icon">🔍</div>
              <h3>Consulta de Cliente</h3>
              <p>Rastrea el estatus de tu transmisión ingresando el número de folio asignado.</p>
              <form onSubmit={handleSearchVehicle} className="search-form">
                <div className="search-form__field">
                  <input
                    type="text"
                    placeholder="Ej. 4812"
                    className="search-form__input"
                    value={searchFolio}
                    onChange={(e) => { setSearchFolio(e.target.value); setSearchError(''); }}
                  />
                  <button type="submit" className="btn btn--secondary">Rastrear</button>
                </div>
                {searchError && <span className="search-form__error">{searchError}</span>}
              </form>
              <div className="mock-helper">
                <span>O simula directo:</span>
                <button type="button" className="btn-link" onClick={handleTrackMockVehicle}>
                  Ver Auto Activo #4812 (Ford Explorer)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="landing__faq-area">
          <span className="col-section-title">Preguntas Frecuentes</span>
          <div className="faq-accordion">
            {[
              {
                q: "¿Cuánto tarda una reparación de transmisión?",
                a: "Depende del daño. Cambio de aceite: mismo día. Reconstrucciones mayores: 3 a 7 días hábiles, sujeto a disponibilidad de refacciones."
              },
              {
                q: "¿El diagnóstico tiene algún costo?",
                a: "Cuesta entre $300 y $500 pesos. Si decides reparar con nosotros, este costo se descuenta en su totalidad del presupuesto final."
              },
              {
                q: "¿Qué garantía ofrecen en sus reparaciones?",
                a: "6 meses o 10,000 km en mano de obra y refacciones. Entregamos póliza física firmada al liquidar."
              },
              {
                q: "¿Trabajan sobre cita agendada?",
                a: "No. Recepción directa. Traes tu vehículo en horario de taller y te llamamos con el reporte. Trato directo sin burocracia."
              }
            ].map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                  <button
                    type="button"
                    className="faq-item__trigger"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                  >
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
      </div>

      {/* ── COLUMNA DERECHA: Precios ── */}
      <div className="landing__col--right">
        <span className="col-section-title">Estimador de Precios</span>

        <div className="price-card">
          <h4>Diagnóstico Completo</h4>
          <div><span className="price-card__amount">$300 – $500</span><span className="price-card__currency">MXN</span></div>
          <p className="price-card__note">Gratis si decides reparar con nosotros</p>
        </div>

        <div className="price-card">
          <h4>Cambio de Aceite ATF</h4>
          <div><span className="price-card__amount">$600 – $1,200</span><span className="price-card__currency">MXN</span></div>
          <p className="price-card__note">Mantenimiento preventivo básico</p>
        </div>

        <div className="price-card">
          <h4>Reparación Transmisión Estándar</h4>
          <div><span className="price-card__amount">$4,000 – $10,000</span><span className="price-card__currency">MXN</span></div>
          <p className="price-card__note">Ajuste de bronces, baleros y sincronizadores</p>
        </div>

        <div className="price-card">
          <h4>Reconstrucción Automática</h4>
          <div><span className="price-card__amount">$8,000 – $18,000</span><span className="price-card__currency">MXN</span></div>
          <p className="price-card__note">Overhaul completo con kit de pastas y juntas</p>
        </div>

        <p className="price-disclaimer">
          Rangos orientativos. El costo definitivo se define tras el diagnóstico físico.
        </p>
      </div>

    </div>{/* /landing__three-col */}
  </article>
)}