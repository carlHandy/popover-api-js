import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Popover } from '../popover';

describe('Popover', () => {
  let target: HTMLElement;

  beforeEach(() => {
    target = document.createElement('div');
    document.body.appendChild(target);
  });

  afterEach(() => {
    document.body.removeChild(target);
  });

  it('should initialize with correct content', () => {
    // @ts-ignore: 'popover' is declared but its value is never read
    const popover = new Popover({ target, content: 'Hello, World!' });
    expect(target.querySelector('.popover')?.textContent).toBe('Hello, World!');
  });

  it('should toggle popover visibility', () => {
    const popover = new Popover({ target, content: 'Hello, World!' });
    popover.toggle();
    expect(target.querySelector('.popover')?.classList.contains('show')).toBe(true);
    popover.toggle();
    expect(target.querySelector('.popover')?.classList.contains('show')).toBe(false);
  });
});
