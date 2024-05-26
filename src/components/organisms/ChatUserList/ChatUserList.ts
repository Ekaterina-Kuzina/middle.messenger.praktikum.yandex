import { Block } from '../../../helpers';
import { Link, SearchInput } from '../../atoms';
import { ChatUserListProps } from './ChatUserList.types.ts';
import { UserItem } from '../UserItem';

export class ChatUserList extends Block {
  constructor(props: ChatUserListProps) {
    super({
      ...props,
      SearchInput: new SearchInput({
        value: props.value,
      }),
      ProfileLink: new Link({
        page: 'userInfo',
        text: 'Профиль >',
      }),
      lists: [
        new UserItem({
          name: 'Андрей',
          text: 'Изображение',
          date: '10:49',
          counts: 2,
        }),
        new UserItem({
          name: 'Киноклуб',
          text: 'Стикер',
          date: '12:00',
          counts: 2,
        }),
        new UserItem({
          name: 'Илья',
          text: 'Друзья, у меня для вас особенный выпуск новостей! Бла бла бла',
          date: '15:12',
          counts: 4,
        }),
      ],
    });
  }
  override render() {
    return `
      <div class='chat-user'>
        <div class='chat-user__profile-link'>
        {{{ ProfileLink }}}
        </div>
        <div class='chat-user__search'>
          {{{ SearchInput }}}
        </div>
        {{{ lists }}}
      </div>
    `;
  }
}
