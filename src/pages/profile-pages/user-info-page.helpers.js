import Handlebars from "handlebars";

Handlebars.registerHelper("userInfo-fields", () => {
  return [
    { name: "email", title: "Почта", value: "pochta@yandex.ru" },
    { name: "login", title: "Логин", value: "ivanivanov" },
    { name: "first_name", title: "Имя", value: "Иван" },
    { name: "second_name", title: "Фамилия", value: "Иванов" },
    { name: "display_name", title: "Имя в чате", value: "Иван" },
    { name: "phone", title: "Телефон", value: "+7 (909) 967 30 30" },
  ];
});
