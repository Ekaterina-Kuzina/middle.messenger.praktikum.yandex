import { Avatar, Input } from '../../../../components';

export type UpdateInfoPageProps = {
  name?: string;
  avatar?: string;
  notEdit: boolean;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  AvatarComponent: Avatar;
  EmailInput: Input;
  LoginInput: Input;
  FirstNameInput: Input;
  SecondNameInput: Input;
  DisplayNameInput: Input;
  PhoneInput: Input;
};
