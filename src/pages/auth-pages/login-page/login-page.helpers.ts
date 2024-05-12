import * as Handlebars from 'handlebars';

Handlebars.registerHelper('login-inputs', () => [
  { name: 'login', title: 'Логин' },
  { name: 'password', title: 'Пароль' },
]);
