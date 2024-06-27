import { Block } from '../../../helpers';
import { Button, Input, Link, Title } from '../../../components';
import router from '../../../router.ts';
import { LoginData } from '../../../api/AuthApi.ts';
import { UserController } from '../../../controllers';

export class LoginPage extends Block {
  constructor() {
    super({
      isVisible: true,
      Title: new Title({
        text: 'Вход',
        className: 'auth-form__title',
      }),
      LoginInput: new Input({
        name: 'login',
        label: 'Логин',
        value: '',
        labelLeft: false,
        type: 'text',
      }),
      PasswordInput: new Input({
        name: 'password',
        label: 'Пароль',
        value: '',
        labelLeft: false,
        type: 'text',
      }),
      Button: new Button({
        text: 'Авторизоваться',
        page: '/chat',
        type: 'submit',
      }),
      Link: new Link({
        text: 'Нет аккаунта?',
        page: '/sign-up',
        className: 'auth-form__link',
      }),
      events: {
        submit: (e: Event) => {
          this.handleSubmit(e);
        },
      },
    });
    const userController = new UserController();
    userController.getUser().then((response) => {
      if (response instanceof XMLHttpRequest && response.status === 200) {
        router.go('/messenger');
      }
    });
  }

  componentDidMount() {
    const userController = new UserController();
    console.log('userController', userController);
    userController.getUser().then((response) => {
      if (response instanceof XMLHttpRequest && response.status === 200) {
        router.go('/messenger');
      }
    });
  }

  handleSubmit = (event: Event) => {
    const userController = new UserController();
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    let isValid = true;
    console.log('isValid', isValid);
    console.log('event.target', form.getElementsByClassName('error'));

    for (const errorElement of form.getElementsByClassName('error')) {
      console.log('errorElement', errorElement);
      if (errorElement.textContent?.trim() !== '') {
        isValid = false;
        break;
      }
      console.log('isValid', isValid);
    }

    if (isValid) {
      const formData = new FormData(form);
      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });
      userController.signIn(data as LoginData).then((response) => {
        if (response instanceof XMLHttpRequest && response.status === 200) {
          router.go('/messenger');
          form.reset();
        } else {
          alert('Возникла ошибка');
        }
      });
    }
  };

  override render() {
    return `
          <main class='dialog-wrapper'>
            <div class='dialog'>
                <form class="auth-form">
                 {{{ Title }}}
                
                  <div class="auth-form__inputs">
                    {{{ LoginInput }}}
                    {{{ PasswordInput }}}
                  </div>
                  <div class="auth-form__footer">
                    {{{ Button }}}
                    {{{ Link }}}
                  </div>
                </form>
            </div>
          </main>
    `;
  }
}
