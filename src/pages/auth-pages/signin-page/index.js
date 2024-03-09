import Handlebars from "handlebars";
export * from "./signin-page.helpers.js";
export { default as SigninPage } from "./signin-page.hbs?raw";

Handlebars.registerHelper("signin-inputs", () => {
  return [
    { name: "login", title: "Почта" },
    { name: "password", title: "Логин" },
    { name: "login", title: "Имя" },
    { name: "password", title: "Фамилия" },
    { name: "login", title: "Телефон" },
    { name: "password", title: "Пароль" },
    { name: "password", title: "Пароль (ещё раз)" },
  ];
});
