import { Block } from '../../../helpers';
import { Avatar, Input, Link } from '../../../components';
import { UserInfoPageProps } from './UserInfoPage.types.ts';
import router from '../../../router.ts';

export class UserInfoPage extends Block {
  constructor(props: UserInfoPageProps) {
    super({
      Avatar: new Avatar({
        src: props.src || '',
      }),
      EmailInput: new Input({
        name: 'email',
        label: 'Почта',
        value: 'pochta@yandex.ru',
        labelLeft: true,
        className: 'profile__input',
        readonly: 'readonly',
        type: 'email',
      }),
      LoginInput: new Input({
        name: 'login',
        label: 'Логин',
        value: 'ivanivanov',
        labelLeft: true,
        className: 'profile__input',
        readonly: 'readonly',
        type: 'text',
      }),
      FirstName: new Input({
        name: 'first_name',
        label: 'Имя',
        value: 'Иван',
        labelLeft: true,
        className: 'profile__input',
        readonly: 'readonly',
        type: 'text',
      }),
      SecondName: new Input({
        name: 'second_name',
        label: 'Фамилия',
        value: 'Иванов',
        labelLeft: true,
        className: 'profile__input',
        readonly: 'readonly',
        type: 'text',
      }),
      DisplayName: new Input({
        name: 'display_name',
        label: 'Имя в чате',
        value: 'Иван',
        labelLeft: true,
        className: 'profile__input',
        readonly: 'readonly',
        type: 'text',
      }),
      Phone: new Input({
        name: 'phone',
        label: 'Телефон',
        value: '+79099673030',
        labelLeft: true,
        className: 'profile__input',
        readonly: 'readonly',
        type: 'text',
      }),
      ChangeDataLink: new Link({
        text: 'Изменить данные',
        page: '/edit-profile',
      }),
      ChangePasswordLink: new Link({
        text: 'Изменить пароль',
        page: '/edit-password',
      }),
      LogoutLink: new Link({
        text: 'Выйти',
        page: '/',
        className: 'profile__links_red',
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
                    <p class="name">
                        Иван
                    </p>
                </div>
                <div class="profile__info">
                    {{{EmailInput}}}
                    {{{LoginInput}}}
                    {{{FirstName}}}
                    {{{SecondName}}}
                    {{{DisplayName}}}
                    {{{Phone}}}
                </div>
                <div class="profile__links">
                    {{{ChangeDataLink}}}
                    {{{ChangePasswordLink}}}
                    {{{LogoutLink}}}
                </div>
            </div>
        </main>
    `;
  }
}
