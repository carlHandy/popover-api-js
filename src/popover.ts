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
    this.target = options.target;
    this.popover = document.createElement('div');
    this.popover.setAttribute('popover', 'auto');
    this.popover.innerText = options.content;
    document.body.appendChild(this.popover);

    this.target.setAttribute('popovertarget', this.popover.id);
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.target.addEventListener('click', () => this.toggle());
  }

  public show(): void {
    this.popover.showPopover();
  }

  public hide(): void {
    this.popover.hidePopover();
  }

  public toggle(): void {
    this.popover.togglePopover();
  }
}

export { Popover };
