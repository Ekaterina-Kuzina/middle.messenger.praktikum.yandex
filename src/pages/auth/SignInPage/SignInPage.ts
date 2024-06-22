import { Block } from '../../../helpers';
import { Button, Input, Link, Title } from '../../../components';
import { navigate } from '../../../helpers/navigate.ts';

export class SignInPage extends Block {
  constructor() {
    super({
      Title: new Title({
        text: 'Регистрация',
        className: 'auth-form__title',
      }),
      EmailInput: new Input({
        name: 'email',
        label: 'Почта',
        value: '',
        labelLeft: false,
        type: 'email',
      }),
      LoginInput: new Input({
        name: 'login',
        label: 'Логин',
        value: '',
        labelLeft: false,
        type: 'text',
      }),
      FirstName: new Input({
        name: 'first_name',
        label: 'Имя',
        value: '',
        labelLeft: false,
        type: 'text',
      }),
      SecondName: new Input({
        name: 'second_name',
        label: 'Фамилия',
        value: '',
        labelLeft: false,
        type: 'text',
      }),
      Phone: new Input({
        name: 'phone',
        label: 'Телефон',
        value: '',
        labelLeft: false,
        type: 'text',
      }),
      Password: new Input({
        name: 'password',
        label: 'Пароль',
        value: '',
        labelLeft: false,
        type: 'text',
      }),
      RepeatedPasswordInput: new Input({
        name: 'password',
        label: 'Пароль (еще раз)',
        value: '',
        labelLeft: false,
        type: 'text',
      }),
      Button: new Button({
        type: 'submit',
        text: 'Зарегистрироваться',
        page: 'chat',
      }),
      Link: new Link({
        text: 'Войти',
        page: '/',
        className: 'auth-form__link',
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
    console.log('event.target ', event.target);
    const form = event.target as HTMLFormElement;
    let isValid = true;

    for (const errorElement of form.getElementsByClassName('error')) {
      if (errorElement.textContent?.trim() !== '') {
        isValid = false;
        break;
      }
    }
    console.log('data');
    if (isValid) {
      const formData = new FormData(form);
      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });
      console.log(data);
      navigate('chat');
      form.reset();
    }
  };

  override render() {
    return `
      <main class='dialog-wrapper'>
        <div class='dialog'>
            <form class="auth-form" >
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
