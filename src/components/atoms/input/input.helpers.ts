import * as Handlebars from 'handlebars';

Handlebars.registerHelper('isReadonly', (readonly) => readonly ?? '');
