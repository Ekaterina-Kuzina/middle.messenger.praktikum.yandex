import { Block } from '../../helpers';
import { ChatUserList, ChatView } from '../../components';

export class ChatPage extends Block {
  constructor() {
    super({
      ChatUserList: new ChatUserList({
        value: '',
      }),
      ChatView: new ChatView({
        name: 'Иван',
        src: '',
      }),
    });
  }
  override render() {
    return `
      <main class='chat-container'>
        <div class='chat-container__user-list'>
          {{{ ChatUserList }}}
        </div>
        <div class='chat-container__chat-view'>
          {{{ ChatView }}}
        </div>
      </main>
    `;
  }
}
