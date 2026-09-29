import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AppPage = 'home' | 'contact';

interface NavigationContextType {
  currentPage: AppPage;
  navigateTo: (page: AppPage, targetSectionId?: string) => void;
  isTransitioning: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      if (hash === '#/contact' || hash === '#contact-page' || pathname === '/contact') {
        return 'contact';
      }
    }
    return 'home';
  });

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const handleHashOrPopState = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      if (hash === '#/contact' || hash === '#contact-page' || pathname === '/contact') {
        setCurrentPage('contact');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handleHashOrPopState);
    window.addEventListener('hashchange', handleHashOrPopState);
    return () => {
      window.removeEventListener('popstate', handleHashOrPopState);
      window.removeEventListener('hashchange', handleHashOrPopState);
    };
  }, []);

  const navigateTo = (page: AppPage, targetSectionId?: string) => {
    if (page === currentPage && !targetSectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsTransitioning(true);

    if (page === 'contact') {
      window.location.hash = '#/contact';
      setCurrentPage('contact');
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => setIsTransitioning(false), 350);
    } else {
      // Navigating back to home
      if (window.location.hash.includes('contact')) {
        history.pushState(null, '', window.location.pathname + (targetSectionId ? `#${targetSectionId}` : ''));
      }
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'instant' });

      setTimeout(() => {
        setIsTransitioning(false);
        if (targetSectionId) {
          const el = document.getElementById(targetSectionId);
          if (el) {
            const navOffset = 80;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }
      }, 50);
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo, isTransitioning }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
