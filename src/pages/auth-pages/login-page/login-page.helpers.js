import Handlebars from "handlebars";

Handlebars.registerHelper("login-inputs", () => {
  return [
    { name: "login", title: "Логин", value: "fff" },
    { name: "password", title: "Пароль" },
  ];
});
