import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t-2 border-ghibli-header/30 mt-16 py-8">
      <div className="container mx-auto text-center text-ghibli-text/80 dark:text-ghibli-bg/80 space-y-2">
        
        <p className="text-sm">
          Copyright &copy; {currentYear} Ghibli-pedia. All Rights Reserved.
        </p>

        <p className="text-sm">
          Created by{' '}
          <a 
            href="https://github.com/ofikur" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-semibold text-ghibli-header hover:underline transition-colors"
          >
            Ofikur R.
          </a>
        </p>
        <p className="text-xs">
          Powered by the <a href="https://ghibliapi.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">Ghibli API</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;