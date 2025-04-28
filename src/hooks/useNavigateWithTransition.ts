import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useNavigateWithTransition = () => {
  const navigate = useNavigate();

  const navigateWithTransition = useCallback((to: string) => {
    // Check if it's a hash link
    if (to.startsWith('#')) {
      // For hash links, use smooth scrolling
      const element = document.querySelector(to);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      return;
    }

    // For regular navigation, use the router
    navigate(to);
  }, [navigate]);

  return navigateWithTransition;
};

export default useNavigateWithTransition;
