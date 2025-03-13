import { useState, useCallback, useEffect } from 'react';

interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export const useDisclosure = (initialState: boolean = false): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position and body style
      const scrollY = window.scrollY;
      const originalStyle = window.getComputedStyle(document.body).overflow;
      
      // Prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // Restore scrolling when component unmounts or modal closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = originalStyle;
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle
  };
};

export default useDisclosure;
