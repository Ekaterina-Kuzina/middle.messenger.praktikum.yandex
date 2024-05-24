import { Block } from '../../../helpers';
import { Button, Input, Link, Title } from '../../../components';

// import {navigate} from "../../../helpers/navigate";

export class SignInPage extends Block {
  constructor() {
    super({
      Title: new Title({
        text: 'Регистрация',
        className: 'auth-form__title',
      }),
      EmailInput: new Input({
        name: 'email',
        title: 'Почта',
        value: '',
        labelLeft: false,
      }),
      LoginInput: new Input({
        name: 'login',
        title: 'Логин',
        value: '',
        labelLeft: false,
      }),
      FirstName: new Input({
        name: 'first_name',
        title: 'Имя',
        value: '',
        labelLeft: false,
      }),
      SecondName: new Input({
        name: 'second_name',
        title: 'Фамилия',
        value: '',
        labelLeft: false,
      }),
      Phone: new Input({
        name: 'phone',
        title: 'Телефон',
        value: '',
        labelLeft: false,
      }),
      Password: new Input({
        name: 'password',
        title: 'Пароль',
        value: '',
        labelLeft: false,
      }),
      RepeatedPasswordInput: new Input({
        name: 'password',
        title: 'Пароль (еще раз)',
        value: '',
        labelLeft: false,
      }),
      Button: new Button({
        text: 'Зарегистрироваться',
        page: 'chat',
      }),
      Link: new Link({
        text: 'Войти',
        page: 'login',
        className: 'auth-form__link',
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
      <main class='dialog-wrapper'>
        <div class='dialog'>
            <form class="auth-form">
                {{{Title}}}
                <div class="auth-form__inputs">
                {{{EmailInput}}}
                {{{LoginInput}}}
                {{{FirstName}}}
                {{{SecondName}}}
                {{{Phone}}}
                {{{Password}}}
                {{{RepeatedPasswordInput}}}
                </div>
                <div class="auth-form__footer">
                    {{{Button}}}
                    {{{Link}}}
                </div>
            </form>
        </div>
      </main>
    `;
  }
}
