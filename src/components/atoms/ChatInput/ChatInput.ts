import { Block } from '../../../helpers';
import { ChatInputProps } from './ChatInput.types.ts';

export class ChatInput extends Block {
  constructor(props: ChatInputProps) {
    super({
      value: props.value,
    });
  }
  override render() {
    return `
      <div class='chat-input'>
        <input
          class='chat-input__input'
          type='text'
          name='message'
          value='{{ value }}'
          placeholder='Сообщение'
          required
        />
      </div>
    `;
  }
}
