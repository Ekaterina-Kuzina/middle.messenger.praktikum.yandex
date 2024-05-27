import { Block, validate } from '../../../helpers';
import { InputProps } from './Input.types';

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      label: props.label || 'text',
      labelLeft: props.labelLeft,
      name: props.name,
      className: props.className,
      readonly: props.readonly,
      value: props.value,
      type: props.type,
      error: props.error,
      events: {
        blur: (e: Event) => {
          this.handleBlur(e);
        },
      },
    });
  }

  handleBlur = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.setProps({ value: target.value });
    this.setProps({ error: validate(target.value, this.props.name) });
  };

  override render() {
    return `
        <div class="input{{#if className}} {{className}}{{/if}}">
            <label for="{{ name }}" class="{{#unless labelLeft}}input__title{{/unless}}">{{ label }}</label>
            <input name="{{ name }}" type='{{ type }}' value="{{ value }}" {{isReadonly readonly}} class="{{#unless labelLeft}}input__field{{/unless}}">
            <span class='input__error error'>
              {{#if error}}
              {{ error }}
              {{/if}}
            </span>
        </div>
    `;
  }
}
