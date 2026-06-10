import { useState, useEffect, useRef } from 'react';
import './Breadcrumb.css';
import BreadcrumbItem from './components/BreadcrumbItem';
import CollapsibleItem from './components/CollapsibleItem';
import ChevronIcon from './components/ChevronIcon';

export default function Breadcrumb({ items = [], maxItems = 4 }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!items || items.length === 0) return null;

  const totalItems = items.length;
  const shouldCollapse = totalItems > maxItems;

  // Determine what to display
  let itemsToRender = [];

  if (shouldCollapse) {
    // Keep first item (Home/Inicio)
    const firstItem = items[0];
    // Keep last two items
    const lastItems = items.slice(totalItems - 2);
    // Middle items are collapsed
    const collapsedItems = items.slice(1, totalItems - 2);

    itemsToRender = [
      { type: 'item', data: firstItem, originalIndex: 0 },
      { type: 'collapsed', data: collapsedItems },
      ...lastItems.map((item, idx) => ({
        type: 'item',
        data: item,
        originalIndex: totalItems - 2 + idx
      }))
    ];
  } else {
    itemsToRender = items.map((item, idx) => ({
      type: 'item',
      data: item,
      originalIndex: idx
    }));
  }

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol className="breadcrumb__list">
        {itemsToRender.map((node, index) => {
          const isLastNode = index === itemsToRender.length - 1;

          if (node.type === 'collapsed') {
            return (
              <CollapsibleItem
                key="collapsed"
                collapsedItems={node.data}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
                dropdownRef={dropdownRef}
              />
            );
          }

          const originalIndex = node.originalIndex;
          const isRealLast = originalIndex === totalItems - 1;

          return (
            <li key={originalIndex} className="breadcrumb__item">
              <BreadcrumbItem
                item={node.data}
                isLast={isRealLast}
                originalIndex={originalIndex}
                totalItems={totalItems}
              />
              {!isLastNode && (
                <span className="breadcrumb__separator-wrapper" aria-hidden="true">
                  <ChevronIcon />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
