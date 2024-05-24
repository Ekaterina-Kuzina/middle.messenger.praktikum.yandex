import { Block } from '../../../helpers';
import { InputProps } from './Input.types';

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      title: props.title,
      labelLeft: props.labelLeft,
      name: props.name,
      className: props.className,
      isReadonly: props.isReadonly,
      value: props.value,
      // events: {
      //     click: (event: Event) => {
      //         event.preventDefault();
      //         navigate(props.page);
      //     },
      // },
    });
  }

  override render() {
    return `
        <div class="input{{#if className}} {{className}}{{/if}}">
            <label for="{{ name }}" class="{{#unless labelLeft}}input__title{{/unless}}">{{ title }}</label>
            <input name="{{ name }}" value="{{ value }}" readonly="{{ isReadonly }}" class="{{#unless labelLeft}}input__field{{/unless}}">
        </div>
    `;
  }
}
