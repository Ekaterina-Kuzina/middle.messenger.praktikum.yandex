import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

const pages = {
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

function navigate(page) {
  const [source, args] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener("DOMContentLoaded", () => navigate("login"));

document.addEventListener("click", (e) => {
  const page = e.target.getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
