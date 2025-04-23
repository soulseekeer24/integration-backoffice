import React, { useState, useCallback } from 'react';

interface ContextMenuPosition {
  x: number;
  y: number;
}

interface UseContextMenuReturn {
  visible: boolean;
  position: ContextMenuPosition;
  onContextMenu: (e: React.MouseEvent) => void;
  closeMenu: () => void;
}

const useContextMenu = (): UseContextMenuReturn => {
  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<ContextMenuPosition>({ x: 0, y: 0 });

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // Calculate position to ensure menu stays within viewport
    const x = e.clientX; // 200px is approximate menu width
    const y = e.clientY; // 150px is approximate menu height
    
    setPosition({ x, y });
    setVisible(true);
  }, []);

  const closeMenu = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    visible,
    position,
    onContextMenu,
    closeMenu,
  };
};

export default useContextMenu;
