import React, { useEffect, useRef } from 'react';
import { Popover } from './popover';
import { PopoverOptions } from './interface/options';

interface PopoverComponentProps extends PopoverOptions {
  children: React.ReactNode;
}

const PopoverComponent: React.FC<PopoverComponentProps> = ({ target, content, position, children }) => {
  const popoverRef = useRef<Popover | null>(null);

  useEffect(() => {
    if (target) {
      popoverRef.current = new Popover({ target, content, position });
    }
    return () => {
      popoverRef.current = null;
    };
  }, [target, content, position]);

  return <>{children}</>;
};

export default PopoverComponent;
