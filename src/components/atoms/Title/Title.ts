import { Block } from '../../../helpers';
import { TitleProps } from './Title.types';

export class Title extends Block {
  constructor(props: TitleProps) {
    super({
      text: props.text,
      className: props.className,
    });
  }

  override render() {
    return `
        <h1 class="title{{#if className}} {{className}}{{/if}}">
          {{ text }}
        </h1>
    `;
  }
}
