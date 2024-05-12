import * as Handlebars from 'handlebars';
import * as Components from './components/index';
import * as Pages from './pages';

const pages:Record<string, string[]> = {
  chat: [Pages.ChatPage],
  login: [Pages.LoginPage],
  signin: [Pages.SigninPage],
  404: [Pages.Page404],
  500: [Pages.Page500],
  userInfo: [Pages.UserInfoPage],
  updatePassword: [Pages.UpdatePasswordPage],
  updateInfo: [Pages.UpdateInfoPage],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page:string) {
  const [source, args] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', (e) => {
  const target = e.target as HTMLTextAreaElement;
  const page = target.getAttribute('page') ;

  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
