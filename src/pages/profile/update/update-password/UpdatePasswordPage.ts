import { Block } from '../../../../helpers';
import { Avatar, Button, Input } from '../../../../components';
import { UpdatePasswordPageProps } from './UpdatePasswordPage.types.ts';
import router from '../../../../router.ts';

export class UpdatePasswordPage extends Block {
  constructor(props: UpdatePasswordPageProps) {
    super({
      Avatar: new Avatar({
        src: props.src || '',
      }),
      OldPasswordInput: new Input({
        name: 'oldPassword',
        label: 'Старый пароль',
        className: 'profile__input',
        value: 'Старый пароль',
        labelLeft: true,
        type: 'text',
      }),
      NewPasswordInput: new Input({
        name: 'newPassword',
        label: 'Новый пароль',
        className: 'profile__input',
        value: 'Новый пароль',
        labelLeft: true,
        type: 'text',
      }),
      RepeatNewPasswordInput: new Input({
        name: 'newPassword',
        label: 'Повторите новый пароль',
        className: 'profile__input',
        value: 'Повторите новый пароль',
        labelLeft: true,
        type: 'text',
      }),
      Button: new Button({
        text: 'Сохранить',
        page: '/settings',
        className: 'update-btn',
        type: 'submit',
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
    const form = event.target as HTMLFormElement;
    let isValid = true;

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
      console.log(data);
      router.go('messenger');
      form.reset();
    }
  };

  override render() {
    return `
        <main class="profile-wrapper">
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
            </div>
        </main>
    `;
  }
}
