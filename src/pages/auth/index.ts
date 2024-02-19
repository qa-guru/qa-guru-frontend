export { default as LoginPage } from "./login";
export { default as SignUpPage } from "./sign-up";
export { default as ResetPage } from "./reset";
export { default as SetPasswordPage } from "./set-password";
export { default as ConfirmTokenPage } from "./confirm-token";
// причина по которой export default плохо


// а еще, вся эта папка pages - бойлерплейтный однотипный код. не нужно
// нужно то что у вас называется container (в основном это все таки page)
// класть прям сюда и импортировать хуки и view из features
