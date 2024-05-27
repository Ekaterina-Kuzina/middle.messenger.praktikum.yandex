import { navigate } from '../../../helpers/navigate';
import { Block } from '../../../helpers';
import { LinkProps } from './Link.types';

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      href: props.href || '#',
      text: props.text,
      page: props.page,
      className: props.className,
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
        <a class="link{{#if className}} {{className}}{{/if}}" page="{{ page }}">
            {{ text }}
        </a>
    `;
  }
}
