import { Block, navigate } from '../../../../helpers';
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
        label: 'Почта',
        value: 'pochta@yandex.ru',
        labelLeft: true,
        className: 'profile__input',
        type: 'email',
      }),
      LoginInput: new Input({
        name: 'login',
        label: 'Логин',
        value: 'ivanivanov',
        labelLeft: true,
        className: 'profile__input',
        type: 'text',
      }),
      FirstName: new Input({
        name: 'first_name',
        label: 'Имя',
        value: 'Иван',
        labelLeft: true,
        className: 'profile__input',
        type: 'text',
      }),
      SecondName: new Input({
        name: 'second_name',
        label: 'Фамилия',
        value: 'Иванов',
        labelLeft: true,
        className: 'profile__input',
        type: 'text',
      }),
      DisplayName: new Input({
        name: 'display_name',
        label: 'Имя в чате',
        value: 'Иван',
        labelLeft: true,
        className: 'profile__input',
        type: 'text',
      }),
      Phone: new Input({
        name: 'phone',
        label: 'Телефон',
        value: '+7 (909) 967 30 30',
        labelLeft: true,
        className: 'profile__input',
        type: 'text',
      }),
      Button: new Button({
        text: 'Сохранить',
        page: 'userInfo',
        className: 'update-btn',
        type: 'submit',
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
      navigate('chat');
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
