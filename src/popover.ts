import { createPopper, Instance, Placement } from '@popperjs/core';

export interface PopoverOptions {
  target: HTMLElement;
  content: string | HTMLElement;
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
    this.offset = options.offset || [0, 16]; // Default offset of 16px
    this.popover = document.createElement('div');
    this.popover.id = `popover-${Math.random().toString(36).substring(2, 11)}`;
    this.popover.setAttribute('popover', 'auto');
    this.popover.setAttribute('role', 'tooltip');
    this.popover.setAttribute('aria-hidden', 'true');

    // Handle different types of content
    if (typeof options.content === 'string') {
      this.popover.innerHTML = options.content;
    } else if (options.content instanceof HTMLElement) {
      this.popover.appendChild(options.content);
    }

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

    // Add event listener for outside clicks
    document.addEventListener('mousedown', this.outsideClickHandler);
  }

  public hide(): void {
    if (this.popover.parentNode) {
      this.popover.style.display = 'none';
      this.popover.setAttribute('aria-hidden', 'true');
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }

      // Remove event listener for outside clicks
      document.removeEventListener('mousedown', this.outsideClickHandler);
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
