import { Block } from '../../../helpers';
import { PopupItemProps } from './PopupItem.types.ts';

export class PopupItem extends Block {
  constructor(props: PopupItemProps) {
    super({
      events: {
        click: (event: Event) => {
          event.preventDefault();
        },
      },
      ...props,
    });
  }
  override render() {
    return `
      <button class='popup-item' type='button'>
        <img src={{ srcIcon }} alt='icon'>
        <span>{{ text }}</span>
      </button>
    `;
  }
}
