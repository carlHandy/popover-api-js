/**
 * Defines the options available for configuring a Popover instance.
 */
export interface PopoverOptions {
    /** The HTML element that the popover is anchored to. */
    target: HTMLElement;
    /** The content to be displayed within the popover, which can be a string or an HTML element. */
    content: string | HTMLElement;
    /** The preferred position of the popover relative to the target element. Defaults to 'bottom' if not specified. */
    position?: 'top' | 'bottom' | 'left' | 'right';
    /** Optional CSS styles to apply to the popover element. */
    style?: Partial<CSSStyleDeclaration>;
}