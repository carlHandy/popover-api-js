import React, { useEffect, useRef } from 'react';
import { Popover } from './popover';
import { PopoverOptions } from './interface/options';

interface PopoverComponentProps extends PopoverOptions {
  children: React.ReactNode;
}

const PopoverComponent: React.FC<PopoverComponentProps> = ({ target, content, position, children, style }) => {
  const popoverRef = useRef<Popover | null>(null);

  useEffect(() => {
    if (target) {
      popoverRef.current = new Popover({ target, content, position, style });
    }
    return () => {
      if (popoverRef.current) {
        popoverRef.current = null;
      }
    };
  }, [target, content, position, style]);

  return <>{children}</>;
};

export default PopoverComponent;
