import { Block } from '../../../helpers';
import { LinkProps } from './Link.types';
import router from '../../../router.ts';

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      href: props.href || '#',
      events: {
        click: (event: Event) => {
          event.preventDefault();
          console.log('props', props.page);
          router.go(props.page);
        },
      },
      ...props,
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
