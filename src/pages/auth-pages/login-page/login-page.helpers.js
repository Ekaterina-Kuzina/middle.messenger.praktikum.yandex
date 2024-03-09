import Handlebars from "handlebars";

Handlebars.registerHelper("login-inputs", () => {
  return [
    { name: "login", title: "Логин" },
    { name: "password", title: "Пароль" },
  ];
});
