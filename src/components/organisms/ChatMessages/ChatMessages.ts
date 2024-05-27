import { Block } from '../../../helpers';
import { ChatMessagesProps } from './ChatMessages.types.ts';

export class ChatMessages extends Block {
  constructor(props: ChatMessagesProps) {
    super({
      date: props.date,
      messages: props.messages,
    });
  }
  override render() {
    return `
      <div class='chat-messages'>
        <div class='chat-messages__date'>
          {{ date }}
        </div>
        {{{ messages }}}
      </div>
    `;
  }
}
