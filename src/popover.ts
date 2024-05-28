import { createPopper, Instance, Placement } from '@popperjs/core';

export interface PopoverOptions {
  target: HTMLElement;
  content: string;
  position?: Placement;
  style?: Partial<CSSStyleDeclaration>;
  offset?: [number, number]; // [skidding, distance]
}

class Popover {
  private target: HTMLElement;
  private popover: HTMLElement;
  private position: Placement;
  private popperInstance: Instance | null = null;
  private offset: [number, number];

  constructor(options: PopoverOptions) {
    if (!options.target) {
      throw new Error('Popover target element is not provided or invalid.');
    }
    this.target = options.target;
    this.position = options.position || 'bottom';
    this.offset = options.offset || [0, 8]; // Default offset of 8px
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

    this.target.setAttribute('popovertarget', this.popover.id);
    this.addEventListeners();
  }

  private createPopperInstance(): void {
    if (this.popperInstance) {
      this.popperInstance.destroy();
    }
    this.popperInstance = createPopper(this.target, this.popover, {
      placement: this.position,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: this.offset,
          },
        },
      ],
    });
  }

  private addEventListeners(): void {
    this.target.addEventListener('mousedown', this.toggleHandler);
    this.target.addEventListener('touchstart', this.toggleHandler);
    document.addEventListener('mousedown', this.outsideClickHandler);
    document.addEventListener('touchstart', this.outsideClickHandler);
  }

  private toggleHandler = (event: Event): void => {
    event.stopPropagation();
    this.toggle();
  }

  private outsideClickHandler = (event: Event): void => {
    if (!this.target.contains(event.target as Node) && !this.popover.contains(event.target as Node)) {
      this.hide();
    }
  }

  public show(): void {
    if (!this.popover.parentNode) {
      document.body.appendChild(this.popover);
    }
    this.popover.style.display = 'block';
    this.popover.setAttribute('aria-hidden', 'false');
    this.createPopperInstance(); // Create or update Popper instance on show
  }

  public hide(): void {
    if (this.popover.parentNode) {
      this.popover.style.display = 'none';
      this.popover.setAttribute('aria-hidden', 'true');
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }
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
