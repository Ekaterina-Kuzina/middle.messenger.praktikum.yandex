import Handlebars from 'handlebars';

Handlebars.registerHelper('isReadonly', (readonly) => {
  return readonly ?? '';
});
