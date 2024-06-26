import { Block, config, connect } from '../../../../helpers';
import { Avatar, Button, Input, Link } from '../../../../components';
import { UpdateInfoPageProps } from './UpdateInfoPage.types.ts';
import router from '../../../../router.ts';
import { UserController } from '../../../../controllers';
import { ProfileData } from '../../../../api';

class UpdateInfoPage extends Block {
  constructor(props: UpdateInfoPageProps) {
    super({
      isVisible: true,
      AvatarComponent: props.AvatarComponent,
      EmailInput: props.EmailInput,
      LoginInput: props.LoginInput,
      FirstNameInput: props.FirstNameInput,
      SecondNameInput: props.SecondNameInput,
      DisplayNameInput: props.DisplayNameInput,
      PhoneInput: props.PhoneInput,
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

  handleExit = () => {
    const userController = new UserController();
    userController.logout().then((response) => {
      if (response instanceof XMLHttpRequest && response.status === 200) {
        router.go('/');
      }
    });
  };

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
      const userController = new UserController();
      userController.editProfile(data as ProfileData).then((response) => {
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
                  <div class="profile__avatar-wrapper">
                    {{{AvatarComponent}}}
                    </div>
                </div>

                <form class="update-form">
                    <div class="profile__info">
                            {{{EmailInput}}}
                            {{{LoginInput}}}
                            {{{FirstNameInput}}}
                            {{{SecondNameInput}}}
                            {{{DisplayNameInput}}}
                            {{{PhoneInput}}}
                    </div>
                    <div class="profile__btn">
                        {{{Button}}}
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

const editProfileContentConnect = connect((state) => {
  const userData = { ...state.user };
  const AvatarComponent = new Avatar({
    src: userData.avatar ? `${config.baseUrl}/resources${userData.avatar}` : '',
    events: {
      click: () => {
        const userController = new UserController();
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.onchange = async (e: Event) => {
          if (
            e.currentTarget instanceof HTMLInputElement &&
            e.currentTarget.files
          ) {
            const formData = new FormData();
            formData.append('avatar', e.currentTarget.files[0]);
            await userController.editAvatar(formData);
          }
        };
        fileInput.click();
      },
    },
  });
  const EmailInput = new Input({
    name: 'email',
    type: 'email',
    value: userData.email,
    label: 'Почта',
    className: 'profile__input',
    labelLeft: true,
  });
  const LoginInput = new Input({
    name: 'login',
    type: 'text',
    value: userData.login,
    label: 'Логин',
    className: 'profile__input',
    labelLeft: true,
  });
  const FirstNameInput = new Input({
    name: 'first_name',
    type: 'text',
    value: userData.first_name,
    label: 'Имя',
    className: 'profile__input',
    labelLeft: true,
  });
  const SecondNameInput = new Input({
    name: 'second_name',
    type: 'text',
    value: userData.second_name,
    label: 'Фамилия',
    className: 'profile__input',
    labelLeft: true,
  });
  const DisplayNameInput = new Input({
    name: 'display_name',
    type: 'text',
    value: userData.display_name,
    label: 'Имя в чате',
    className: 'profile__input',
    labelLeft: true,
  });
  const PhoneInput = new Input({
    name: 'phone',
    type: 'text',
    value: userData.phone,
    label: 'Телефон',
    className: 'profile__input',
    labelLeft: true,
  });
  return {
    ...userData,
    AvatarComponent,
    EmailInput,
    LoginInput,
    FirstNameInput,
    SecondNameInput,
    DisplayNameInput,
    PhoneInput,
  };
});

export default editProfileContentConnect(UpdateInfoPage);
