import HomeIcon from './HomeIcon';

export default function BreadcrumbItem({ item, isLast, originalIndex, totalItems }) {
  const isRoot = originalIndex === 0;

  if (isLast) {
    return (
      <span className="breadcrumb__current" aria-current="page">
        {isRoot && <HomeIcon />}
        <span>{item.label}</span>
      </span>
    );
  }

  const handleClick = (e) => {
    if (item.onClick) {
      item.onClick(e);
    }
  };

  return (
    <a
      href={item.url || '#'}
      className="breadcrumb__link"
      onClick={handleClick}
    >
      {isRoot && <HomeIcon />}
      <span>{item.label}</span>
    </a>
  );
}