import { Block } from '../../../helpers';
import { ButtonProps } from './Button.types';

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      text: props.text,
      type: props.type || 'button',
      page: props.page,
      className: props.className,
      events: {
        click: (event: Event) => {
          if (props.type !== 'submit') {
            event.preventDefault();
          }
        },
      },
    });
  }

  override render() {
    return `
        <button class="button{{#if className}} {{className}}{{/if}}" page="{{ page }}" type="{{ type }}">
          {{ text }}
        </button>
    `;
  }
}
