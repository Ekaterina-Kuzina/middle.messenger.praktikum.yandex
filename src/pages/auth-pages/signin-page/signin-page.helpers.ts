import * as Handlebars from 'handlebars';

Handlebars.registerHelper('signin-inputs', () => [
  { name: 'email', title: 'Почта' },
  { name: 'login', title: 'Логин' },
  { name: 'first_name', title: 'Имя' },
  { name: 'second_name', title: 'Фамилия' },
  { name: 'phone', title: 'Телефон' },
  { name: 'password', title: 'Пароль' },
  { name: 'password', title: 'Пароль (ещё раз)' },
]);
