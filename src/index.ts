import { LoginPage } from './pages';

const container = document.getElementById('app');
console.log('container', container);
const loginBlock = new LoginPage();
container?.replaceChildren(loginBlock.getContent()!);
