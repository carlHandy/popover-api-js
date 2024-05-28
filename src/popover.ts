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

    document.body.appendChild(this.popover); // Ensure popover is in the DOM

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

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = targetRect.top - popoverRect.height;
        left = targetRect.left + (targetRect.width - popoverRect.width) / 2;
        break;
      case 'bottom':
        top = targetRect.bottom;
        left = targetRect.left + (targetRect.width - popoverRect.width) / 2;
        break;
      case 'left':
        top = targetRect.top + (targetRect.height - popoverRect.height) / 2;
        left = targetRect.left - popoverRect.width;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height - popoverRect.height) / 2;
        left = targetRect.right;
        break;
    }

    // Adjust position to keep the popover within the viewport
    if (top < 0) {
      top = targetRect.bottom;
    } else if (top + popoverRect.height > viewportHeight) {
      top = targetRect.top - popoverRect.height;
    }

    if (left < 0) {
      left = targetRect.right;
    } else if (left + popoverRect.width > viewportWidth) {
      left = targetRect.left - popoverRect.width;
    }

    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${left}px`;
  }

  private addEventListeners(): void {
    this.target.addEventListener('mousedown', () => this.toggle());
  }

  public show(): void {
    if (!this.popover.parentNode) {
      document.body.appendChild(this.popover);
    }
    this.popover.style.display = 'block';
    this.popover.setAttribute('aria-hidden', 'false');
    this.setPosition(this.popover.getAttribute('data-position') as 'top' | 'bottom' | 'left' | 'right'); // Update position on show
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
