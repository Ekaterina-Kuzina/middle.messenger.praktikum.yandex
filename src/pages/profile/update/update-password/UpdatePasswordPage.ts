import { Block } from '../../../../helpers';
import { Avatar, Button, Input } from '../../../../components';
import { UpdatePasswordPageProps } from './UpdatePasswordPage.types.ts';

export class UpdatePasswordPage extends Block {
  constructor(props: UpdatePasswordPageProps) {
    super({
      Avatar: new Avatar({
        src: props.src || '',
      }),
      OldPasswordInput: new Input({
        name: 'oldPassword',
        title: 'Старый пароль',
        className: 'profile__input',
        value: '•••••••••',
        labelLeft: true,
      }),
      NewPasswordInput: new Input({
        name: 'newPassword',
        title: 'Новый пароль',
        className: 'profile__input',
        value: '•••••••••',
        labelLeft: true,
      }),
      RepeatNewPasswordInput: new Input({
        name: 'newPassword',
        title: 'Повторите новый пароль',
        className: 'profile__input',
        value: '•••••••••',
        labelLeft: true,
      }),
      Button: new Button({
        text: 'Сохранить',
        page: 'userInfo',
        className: 'update-btn',
      }),
      // events: {
      //     submit: (e: Event) => {
      //         this.handleSubmit(e);
      //     },
      // },
    });
  }
  // handleSubmit = (event: Event) => {
  //     event.preventDefault();
  //     const form = event.target as HTMLFormElement;
  //     let isValid = true;
  //
  //     for (const errorElement of form.getElementsByClassName('error')) {
  //         if (errorElement.textContent?.trim() !== '') {
  //             isValid = false;
  //             break;
  //         }
  //     }
  //
  //     if (isValid) {
  //         const formData = new FormData(form);
  //         const data: Record<string, string> = {};
  //         formData.forEach((value, key) => {
  //             data[key] = value.toString();
  //         });
  //         console.log(data);
  //         navigate('chat');
  //         form.reset();
  //     }
  // };

  override render() {
    return `
        <main class="profile-wrapper">
            <div class="profile">
                <div class="profile__avatar">
                         {{{Avatar}}}
<!--                    <img src="assets/avatar.png" alt="Avatar" class="avatar">-->
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
