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

router
  .use('/', LoginPage)
  .use('/sign-up', SignInPage)
  .use('/settings', UserInfoPage)
  .use('/messenger', ChatPage)
  .use('/edit-password', UpdatePasswordPage)
  .use('/error-404', Page404)
  .use('/error-500', Page500)
  .use('/edit-profile', UpdateInfoPage)
  .start();
