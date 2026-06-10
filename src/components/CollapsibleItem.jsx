import ChevronIcon from './ChevronIcon';

export default function CollapsibleItem({ collapsedItems, dropdownOpen, setDropdownOpen, dropdownRef }) {
  return (
    <li key="collapsed" className="breadcrumb__item breadcrumb__item--collapsed" ref={dropdownRef}>
      <button
        type="button"
        className={`breadcrumb__ellipsis-btn ${dropdownOpen ? 'breadcrumb__ellipsis-btn--open' : ''}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        aria-label="Mostrar más niveles de navegación"
      >
        ...
      </button>
      {dropdownOpen && (
        <ul className="breadcrumb__dropdown" role="menu">
          {collapsedItems.map((collapsedItem, cIdx) => (
            <li key={cIdx} role="none" className="breadcrumb__dropdown-item">
              <a
                href={collapsedItem.url || '#'}
                role="menuitem"
                className="breadcrumb__dropdown-link"
                onClick={(e) => {
                  if (collapsedItem.onClick) collapsedItem.onClick(e);
                  setDropdownOpen(false);
                }}
              >
                {collapsedItem.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <span className="breadcrumb__separator-wrapper" aria-hidden="true">
        <ChevronIcon />
      </span>
    </li>
  );
}