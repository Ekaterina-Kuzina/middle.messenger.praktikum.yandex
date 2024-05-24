import {
    ChatPage,
    LoginPage,
    Page404,
    Page500,
    SignInPage,
    UpdateInfoPage,
    UpdatePasswordPage,
    UserInfoPage
} from '../pages';

type Page =
    | LoginPage
    | ChatPage
    | SignInPage
    | Page404
    | Page500
    | UserInfoPage
    | UpdateInfoPage
    | UpdatePasswordPage

type Pages = Record<string, Page>;

export const navigate = (page: string) => {
    const pages: Pages = {
        login: new LoginPage(),
        chat: new ChatPage(),
        signIn: new SignInPage(),
        '404': new Page404(),
        '500': new Page500(),
        updatePassword: new UpdatePasswordPage(),
        updateInfo: new UpdateInfoPage(),
        userInfo: new UserInfoPage(),
    };

    const container = document.getElementById('app');
    if (!page) return;
    const block = pages?.[page];
    if (container && block) {
        container.replaceChildren(block.getContent()!);
    }
};
