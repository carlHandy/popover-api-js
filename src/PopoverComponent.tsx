/**
 * @module PopoverComponent
 * React component for integrating popovers within React applications.
 * Wraps children elements with a popover using the Popover class.
 */
import React, { useEffect, useRef } from 'react';
import { Popover } from './popover';
import { PopoverOptions } from './interface/options';

interface PopoverComponentProps extends PopoverOptions {
  children: React.ReactNode;
}

/**
 * PopoverComponent is a React functional component that wraps its children with a popover.
 * 
 * @param {PopoverComponentProps} props - The properties for the PopoverComponent.
 * @param {HTMLElement} props.target - The target element for the popover.
 * @param {React.ReactNode} props.content - The content to be displayed inside the popover.
 * @param {string} props.position - The position of the popover relative to the target.
 * @param {React.CSSProperties} [props.style] - Optional styles for the popover.
 * @param {React.ReactNode} props.children - The children elements to be wrapped by the popover.
 * @returns {JSX.Element} The rendered component.
 */
const PopoverComponent: React.FC<PopoverComponentProps> = ({ target, content, position, children, style }): JSX.Element => {
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
