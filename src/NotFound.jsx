import React, { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Página no encontrada";
  }, []);

  return (
    <iframe 
      src="/404.html" 
      title="404 Not Found"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999
      }}
    />
  );
};

export default NotFound;