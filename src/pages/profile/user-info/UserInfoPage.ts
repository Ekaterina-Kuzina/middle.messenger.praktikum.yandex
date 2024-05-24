import { Block } from '../../../helpers';
import { Avatar, Input, Link } from '../../../components';
import { UserInfoPageProps } from './UserInfoPage.types.ts';

export class UserInfoPage extends Block {
  constructor(props: UserInfoPageProps) {
    super({
      Avatar: new Avatar({
        src: props.src || '',
      }),
      EmailInput: new Input({
        name: 'email',
        title: 'Почта',
        value: 'pochta@yandex.ru',
        labelLeft: true,
        className: 'profile__input',
        isReadonly: true,
      }),
      LoginInput: new Input({
        name: 'login',
        title: 'Логин',
        value: 'ivanivanov',
        labelLeft: true,
        className: 'profile__input',
        isReadonly: true,
      }),
      FirstName: new Input({
        name: 'first_name',
        title: 'Имя',
        value: 'Иван',
        labelLeft: true,
        className: 'profile__input',
        isReadonly: true,
      }),
      SecondName: new Input({
        name: 'second_name',
        title: 'Фамилия',
        value: 'Иванов',
        labelLeft: true,
        className: 'profile__input',
        isReadonly: true,
      }),
      DisplayName: new Input({
        name: 'display_name',
        title: 'Имя в чате',
        value: 'Иван',
        labelLeft: true,
        className: 'profile__input',
        isReadonly: true,
      }),
      Phone: new Input({
        name: 'phone',
        title: 'Телефон',
        value: '+7 (909) 967 30 30',
        labelLeft: true,
        className: 'profile__input',
        isReadonly: true,
      }),
      ChangeDataLink: new Link({
        text: 'Изменить данные',
        page: 'updateInfo',
      }),
      ChangePasswordLink: new Link({
        text: 'Изменить пароль',
        page: 'updatePassword',
      }),
      LogoutLink: new Link({
        text: 'Выйти',
        page: 'login',
        className: 'profile__links_red',
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
<!--                    <img src="../../../assets/avatar.png" alt="Avatar" class="avatar">-->
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
