import { ChatViewProps } from './ChatView.types.ts';
import { Block } from '../../../helpers';
import { Avatar, ChatInput } from '../../atoms';
import { ChatController } from '../../../controllers/ChatController.ts';
import store, { Chat, MessageType } from '../../../helpers/Store.ts';
import { connect } from '../../../helpers/connect.ts';
import { Message, PopupItem } from '../../molecules';
import { config } from '../../../helpers/config.ts';

class ChatView extends Block {
  constructor(props: ChatViewProps) {
    super({
      isOpenAddUser: false,
      login: props.login,
      sendMessage: props.sendMessage,
      AvatarComponent: props.AvatarComponent,
      ChatInput: new ChatInput({
        value: '',
      }),
      AddUser: new PopupItem({
        text: 'Добавить пользователя',
        srcIcon: '../../icons/addIcon.svg',
        events: {
          click: () => {
            props.handleAddUser();
          },
        },
      }),
      RemoveUser: new PopupItem({
        text: 'Удалить пользователя',
        srcIcon: '../../icons/removeIcon.svg',
        events: {
          click: () => {
            props.handleRemoveUser();
          },
        },
      }),
      RemoveChat: new PopupItem({
        text: 'Удалить чат',
        srcIcon: '../../icons/removeIcon.svg',
        events: {
          click: () => {
            this.handleRemoveChat();
          },
        },
      }),
      events: {
        submit: (e: Event) => {
          props.sendMessage(e);
        },
      },
      ChatMessages: props.ChatMessages,
    });
  }

  handleRemoveChat = () => {
    const chatController = new ChatController();
    if (store.getState().selectedChat) {
      chatController.deleteChat(store.getState().selectedChat);
    }
  };

  override render() {
    return `
      <div class='chat-view'>
        <div class='chat-view__header'>
          <div class='chat-view__header__avatar'>
            {{{ AvatarComponent }}}
          </div>
          <h3 class='chat-view__header__name'>
            {{ title }}
          </h3>
          <div class='chat-view__header__dots'>
            <img src='../../icons/vertical-dots.svg' alt='dots'>
            <div class='popup'>
              <div class='chat-view__header__popup-item'>
                {{{ AddUser }}}
              </div>
              <div class='chat-view__header__popup-item'>
                {{{ RemoveUser }}}
              </div>
              <div class='chat-view__header__popup-item'>
                {{{ RemoveChat }}}
              </div>
            </div>
          </div>
        </div>
        <div class='chat-view__body'>
          {{{ ChatMessages }}}
        </div>
        <form class='chat-view__footer'>
          <img src='../../icons/clip.svg' alt='clip' class='chat-view__footer__clip'>
          {{{ ChatInput }}}
          <button type='submit' class='chat-view__footer__button'>
            <img src='../../icons/arrowRightIcon.svg' alt='arrow' class='chat-view__footer__arrow'>
          </button>
        </form>
      </div>
    `;
  }
}

const chatViewConnect = connect((state) => {
  const currentChat = state.chats.find(
    (chat: Chat) => chat.id === state.selectedChat,
  );
  const ChatMessages = state.messages.map((message: MessageType) => {
    const date = new Date(message.time);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return new Message({
      text: message.content,
      time:
        hours.toString().padStart(2, '0') +
        ':' +
        minutes.toString().padStart(2, '0'),
      isDone: message.is_read,
      isMyself: message.user_id === state.user.id,
    });
  });
  const AvatarComponent = new Avatar({
    src: currentChat?.avatar
      ? `${config.baseUrl}/resources${currentChat?.avatar}`
      : '',
  });
  return { ...currentChat, AvatarComponent, ChatMessages };
});

export default chatViewConnect(ChatView);
