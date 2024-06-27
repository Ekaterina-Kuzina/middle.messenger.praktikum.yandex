import { Block, config, connect } from '../../../helpers';
import { Avatar, Input, Link } from '../../../components';
import { UserInfoPageProps } from './UserInfoPage.types.ts';
import router from '../../../router.ts';
import { UserController } from '../../../controllers';
import { ProfileData } from '../../../api';

class UserInfoPage extends Block {
  constructor(props: UserInfoPageProps) {
    console.log('props', props);
    super({
      isVisible: true,
      AvatarComponent: props.AvatarComponent,
      EmailInput: props.EmailInput,
      LoginInput: props.LoginInput,
      FirstNameInput: props.FirstNameInput,
      SecondNameInput: props.SecondNameInput,
      DisplayNameInput: props.DisplayNameInput,
      PhoneInput: props.PhoneInput,
      EditProfileLink: new Link({
        page: '/edit-profile',
        text: 'Изменить данные',
      }),
      EditPasswordLink: new Link({
        page: '/edit-password',
        text: 'Изменить пароль',
      }),
      BackLink: new Link({
        text: 'Назад к чатам',
        page: '/messenger',
      }),
      ExitLink: new Link({
        page: '/messenger',
        text: 'Выйти',
        className: 'profile__links_red',
        events: {
          click: () => {
            this.handleExit();
          },
        },
      }),
      display_name: props.display_name,
    });
  }
  componentDidMount() {
    const userController = new UserController();
    userController.getUser().then((response) => {
      if (response instanceof XMLHttpRequest && response.status === 401) {
        router.go('/');
      }
    });
  }

  handleEditAvatar = () => {
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
  };

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
                     <p class="name">
                        {{first_name}}
                     </p>
                  </div>
                </div>
                <div class="profile__info">
                    {{{EmailInput}}}
                    {{{LoginInput}}}
                    {{{FirstNameInput}}}
                    {{{SecondNameInput}}}
                    {{{DisplayNameInput}}}
                    {{{PhoneInput}}}
                </div>
                <div class="profile__links">
                    {{{EditProfileLink}}}
                    {{{EditPasswordLink}}}
                    {{{BackLink}}}
                    {{{ExitLink}}}
                </div>
            </div>
        </main>
    `;
  }
}

const profileContentConnect = connect((state) => {
  const userData = { ...state.user };
  const AvatarComponent = new Avatar({
    src: userData.avatar ? `${config.baseUrl}/resources${userData.avatar}` : '',
  });
  const EmailInput = new Input({
    name: 'email',
    type: 'email',
    value: userData.email,
    label: 'Почта',
    labelLeft: false,
    readonly: 'readonly',
  });
  const LoginInput = new Input({
    name: 'login',
    type: 'text',
    value: userData.login,
    label: 'Логин',
    labelLeft: false,
    readonly: 'readonly',
  });
  const FirstNameInput = new Input({
    name: 'first_name',
    type: 'text',
    value: userData.first_name,
    label: 'Имя',
    labelLeft: false,
    readonly: 'readonly',
  });
  const SecondNameInput = new Input({
    name: 'second_name',
    type: 'text',
    value: userData.second_name,
    label: 'Фамилия',
    labelLeft: false,
    readonly: 'readonly',
  });
  const DisplayNameInput = new Input({
    name: 'display_name',
    type: 'text',
    value: userData.display_name,
    label: 'Имя в чате',
    labelLeft: false,
    readonly: 'readonly',
  });
  const PhoneInput = new Input({
    name: 'phone',
    type: 'text',
    value: userData.phone,
    label: 'Телефон',
    labelLeft: false,
    readonly: 'readonly',
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

export default profileContentConnect(UserInfoPage);
