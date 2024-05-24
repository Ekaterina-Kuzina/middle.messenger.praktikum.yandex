import { Block } from '../../../../helpers';
import { Avatar, Button, Input, Link } from '../../../../components';
import { UpdateInfoPageProps } from './UpdateInfoPage.types.ts';

export class UpdateInfoPage extends Block {
  constructor(props: UpdateInfoPageProps) {
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
      }),
      LoginInput: new Input({
        name: 'login',
        title: 'Логин',
        value: 'ivanivanov',
        labelLeft: true,
        className: 'profile__input',
      }),
      FirstName: new Input({
        name: 'first_name',
        title: 'Имя',
        value: 'Иван',
        labelLeft: true,
        className: 'profile__input',
      }),
      SecondName: new Input({
        name: 'second_name',
        title: 'Фамилия',
        value: 'Иванов',
        labelLeft: true,
        className: 'profile__input',
      }),
      DisplayName: new Input({
        name: 'display_name',
        title: 'Имя в чате',
        value: 'Иван',
        labelLeft: true,
        className: 'profile__input',
      }),
      Phone: new Input({
        name: 'phone',
        title: 'Телефон',
        value: '+7 (909) 967 30 30',
        labelLeft: true,
        className: 'profile__input',
      }),
      Button: new Button({
        text: 'Сохранить',
        page: 'userInfo',
        className: 'update-btn',
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
                </div>
        
                <form class="update-form">
                    <div class="profile__info">
                            {{{EmailInput}}}
                            {{{LoginInput}}}
                            {{{FirstName}}}
                            {{{SecondName}}}
                            {{{DisplayName}}}
                            {{{Phone}}}
                    </div>
                    <div class="profile__btn">
                        {{{Button}}}
                    </div>
                </form>
            </div>
        </main>
    `;
  }
}
