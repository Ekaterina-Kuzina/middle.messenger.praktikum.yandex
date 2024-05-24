import { Block } from '../../../helpers';
import { navigate } from '../../../helpers/navigate';
import { ButtonProps } from './Button.types';

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      text: props.text,
      page: props.page,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          navigate(props.page);
        },
      },
    });
  }

  override render() {
    return `
        <button class="button{{#if className}} {{className}}{{/if}}" page="{{ page }}">
          {{ text }}
        </button>
    `;
  }
}
