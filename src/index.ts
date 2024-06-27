import {
  ChatPage,
  LoginPage,
  Page404,
  Page500,
  SignInPage,
  UpdateInfoPage,
  UpdatePasswordPage,
  UserInfoPage,
} from './pages';
import router from './router.ts';
import { withChats, withUser } from './helpers/connect.ts';

router
  .use('/', withUser(LoginPage))
  .use('/sign-up', SignInPage)
  .use('/settings', withUser(UserInfoPage))
  .use('/messenger', withChats(ChatPage))
  .use('/edit-password', withUser(UpdatePasswordPage))
  .use('/edit-profile', withUser(UpdateInfoPage))
  .use('/error-404', Page404)
  .use('/error-500', Page500)
  .start();
