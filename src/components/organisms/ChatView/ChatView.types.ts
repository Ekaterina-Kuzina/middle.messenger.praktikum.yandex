import { Avatar } from '../../atoms';
import { Message } from '../../molecules';

export type ChatViewProps = {
  login: string;
  avatar: string;
  title: string;
  AvatarComponent: Avatar;
  ChatMessages: Message[];
  name?: string;
  notEdit: boolean;
  email: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  handleAddUser: () => unknown;
  handleRemoveUser: () => unknown;
  sendMessage: (e: Event) => unknown;
};
