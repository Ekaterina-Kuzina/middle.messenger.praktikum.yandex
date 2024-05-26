import { Block } from '../../../helpers';
import { Avatar } from '../../atoms';

type UserItemProps = {
  self?: boolean;
  name: string;
  text: string;
  date: string;
  counts: number;
  src?: string;
};

export class UserItem extends Block {
  constructor(props: UserItemProps) {
    super({
      Avatar: new Avatar({
        src: props.src || '',
      }),
      name: props.name,
      self: props.self,
      text: props.text,
      date: props.date,
      counts: props.counts,
    });
  }
  override render() {
    return `
      <div class='user-item'>
        <div class='user-item__avatar'>
          {{{ Avatar }}}
        </div>
        <div class='user-item__content'>
          <h3 class='user-item__content__name'>{{ name }}</h3>
          <h4 class='user-item__content__text'>{{#if self}}<span>Вы: </span>{{/if}}{{ text }}</h4>
        </div>
        <div class='user-item__info'>
          <h3 class='user-item__info__date'>{{ date }}</h3>
          {{#if counts}}
            <div class='user-item__info__counts'>{{ counts }}</div>
          {{/if}}
        </div>
      </div>
    `;
  }
}
