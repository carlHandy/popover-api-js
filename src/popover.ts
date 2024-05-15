export interface PopoverOptions {
  target: HTMLElement;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export class Popover {
  private target: HTMLElement;
  private content: string;
  private position: string;

  constructor(options: PopoverOptions) {
    this.target = options.target;
    this.content = options.content;
    this.position = options.position || 'bottom';
    this.initializePopover();
  }

  private initializePopover(): void {
    const popover = document.createElement('div');
    popover.className = `popover popover-${this.position}`;
    popover.innerText = this.content;

    this.target.appendChild(popover);
    this.addEventListeners(popover);
  }

  private addEventListeners(popover: HTMLElement): void {
    this.target.addEventListener('click', () => {
      popover.classList.toggle('show');
    });
  }

  public show(): void {
    const popover = this.target.querySelector('.popover') as HTMLElement;
    if (popover) {
      popover.classList.add('show');
    }
  }

  public hide(): void {
    const popover = this.target.querySelector('.popover') as HTMLElement;
    if (popover) {
      popover.classList.remove('show');
    }
  }

  public toggle(): void {
    const popover = this.target.querySelector('.popover') as HTMLElement;
    if (popover) {
      popover.classList.toggle('show');
    }
  }
}
