import * as Handlebars from 'handlebars';

Handlebars.registerHelper('update-password-fields', () => [
  { name: 'oldPassword', title: 'Старый пароль', value: '•••••••••' },
  { name: 'newPassword', title: 'Новый пароль', value: '•••••••••' },
  {
    name: 'newPassword',
    title: 'Повторите новый пароль',
    value: '•••••••••',
  },
]);
