import { useState } from 'react';

export const useOpenCloseModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return { isOpen, setIsOpen };
};
