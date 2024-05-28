export interface PopoverOptions {
  target: HTMLElement;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  style?: Partial<CSSStyleDeclaration>;
}
class Popover {
  private target: HTMLElement;
  private popover: HTMLElement;

  constructor(options: PopoverOptions) {
    if (!options.target) {
      throw new Error('Popover target element is not provided or invalid.');
    }
    this.target = options.target;
    this.popover = document.createElement('div');
    this.popover.id = `popover-${Math.random().toString(36).substring(2, 11)}`;
    this.popover.setAttribute('popover', 'auto');
    this.popover.setAttribute('role', 'tooltip');
    this.popover.setAttribute('aria-hidden', 'true');
    this.popover.innerText = options.content;

    // Apply styles if provided
    if (options.style) {
      Object.assign(this.popover.style, options.style);
    }

    // Set position based on the target element and specified position
    if (options.position) {
      this.setPosition(options.position);
    }

    this.target.setAttribute('popovertarget', this.popover.id);
    this.addEventListeners();
  }

  private setPosition(position: 'top' | 'bottom' | 'left' | 'right'): void {
    const targetRect = this.target.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    switch (position) {
      case 'top':
        this.popover.style.top = `${Math.max(0, targetRect.top - popoverRect.height)}px`;
        this.popover.style.left = `${Math.max(0, Math.min(viewportWidth - popoverRect.width, targetRect.left))}px`;
        break;
      case 'bottom':
        this.popover.style.top = `${Math.min(viewportHeight - popoverRect.height, targetRect.bottom)}px`;
        this.popover.style.left = `${Math.max(0, Math.min(viewportWidth - popoverRect.width, targetRect.left))}px`;
        break;
      case 'left':
        this.popover.style.top = `${Math.max(0, Math.min(viewportHeight - popoverRect.height, targetRect.top))}px`;
        this.popover.style.left = `${Math.max(0, targetRect.left - popoverRect.width)}px`;
        break;
      case 'right':
        this.popover.style.top = `${Math.max(0, Math.min(viewportHeight - popoverRect.height, targetRect.top))}px`;
        this.popover.style.left = `${Math.min(viewportWidth - popoverRect.width, targetRect.right)}px`;
        break;
    }
  }

  private addEventListeners(): void {
    this.target.addEventListener('mousedown', () => this.toggle());
  }

  private removeEventListeners(): void {
    this.target.removeEventListener('mousedown', this.toggle);
  }

  public show(): void {
    if (!this.popover.parentNode) {
      document.body.appendChild(this.popover);
    }
    this.popover.style.display = 'block';
    this.popover.setAttribute('aria-hidden', 'false');
  }

  public hide(): void {
    if (this.popover.parentNode) {
      this.popover.style.display = 'none';
      this.popover.setAttribute('aria-hidden', 'true');
    }
  }

  public toggle(): void {
    if (this.popover.style.display === 'block') {
      this.hide();
    } else {
      this.show();
    }
  }
}

export { Popover };
