export interface PopoverOptions {
    target: HTMLElement;
    content: string | HTMLElement;
    position?: 'top' | 'bottom' | 'left' | 'right';
    style?: Partial<CSSStyleDeclaration>;
}