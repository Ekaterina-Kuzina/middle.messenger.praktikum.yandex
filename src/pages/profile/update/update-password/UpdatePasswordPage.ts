import { Block } from '../../../../helpers';
import { Avatar, Button, Input, Link } from '../../../../components';
import router from '../../../../router.ts';
import { PasswordsData } from '../../../../api';
import { UserController } from '../../../../controllers';

export class UpdatePasswordPage extends Block {
  constructor() {
    super({
      isVisible: true,
      Avatar: new Avatar({
        src: '',
      }),
      OldPasswordInput: new Input({
        name: 'oldPassword',
        label: 'Старый пароль',
        className: 'profile__input',
        value: '',
        labelLeft: true,
        type: 'text',
      }),
      NewPasswordInput: new Input({
        name: 'newPassword',
        label: 'Новый пароль',
        className: 'profile__input',
        value: '',
        labelLeft: true,
        type: 'text',
      }),
      RepeatNewPasswordInput: new Input({
        name: 'newPassword',
        label: 'Повторите новый пароль',
        className: 'profile__input',
        value: '',
        labelLeft: true,
        type: 'text',
      }),
      Button: new Button({
        text: 'Сохранить',
        page: '/settings',
        className: 'update-btn',
        type: 'submit',
      }),
      BackLink: new Link({
        text: 'Назад в профиль',
        page: '/settings',
      }),
      events: {
        submit: (e: Event) => {
          this.handleSubmit(e);
        },
      },
    });
  }

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const userController = new UserController();
    const form = event.target as HTMLFormElement;
    let isValid = true;

    for (const inputElement of form.getElementsByTagName('input')) {
      inputElement.focus();
      inputElement.blur();
    }

    for (const errorElement of form.getElementsByClassName('error')) {
      if (errorElement.textContent?.trim() !== '') {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      const formData = new FormData(form);
      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });
      userController.editPassword(data as PasswordsData).then((response) => {
        if (response instanceof XMLHttpRequest && response.status === 200) {
          router.go('/messenger');
          form.reset();
        } else {
          alert('Возникла ошибка');
        }
      });
    }
  };

  hide() {
    super.hide();
    this.setProps({ isVisible: false });
  }

  show() {
    super.show();
    this.setProps({ isVisible: true });
  }

  override render() {
    return `
        <main class="profile-wrapper" {{#if isVisible}} style='display: flex;' {{else}} style='display: none;' {{/if}}>
            <div class="profile">
                <div class="profile__avatar">
                         {{{Avatar}}}
                </div>
        
                <form class="update-form">
                    <div class="profile__info">
                        {{{OldPasswordInput}}}
                        {{{NewPasswordInput}}}
                        {{{RepeatNewPasswordInput}}}
                    </div>
                    <div class="profile__btn">
                        {{{ Button }}}
                    </div>
                </form>
                 <div class="profile__links">
                    {{{BackLink}}}
                </div>
            </div>
        </main>
    `;
  }
}
