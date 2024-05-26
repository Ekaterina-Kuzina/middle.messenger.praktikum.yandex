import { Block } from '../../../helpers';
import { Link, Title } from '../../../components';
import '../error.scss';

export class Page404 extends Block {
  constructor() {
    super({
      Title: new Title({
        text: 'Не туда попали',
        className: 'error-title',
      }),
      Link: new Link({
        text: 'Назад к чатам',
        page: 'login',
        className: 'error-link',
      }),
    });
  }
  override render() {
    return `
        <div class="error-page">
            <p>404</p>
            {{{Title}}}
            {{{Link}}}
        </div>
    `;
  }
}
