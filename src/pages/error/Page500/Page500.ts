import { Block } from '../../../helpers';
import { Link, Title } from '../../../components';
import '../error.scss';

export class Page500 extends Block {
  constructor() {
    super({
      Title: new Title({
        text: 'Мы уже фиксим',
        className: 'error-Title',
      }),
      Link: new Link({
        text: 'Назад к чатам',
        page: 'login',
        className: 'error-Link',
      }),
    });
  }
  override render() {
    return `
        <div class="error-page">
            <p>500</p>
            {{{Title}}}
            {{{Link}}}
        </div>
    `;
  }
}
