import { UserItem } from '../UserItem';

export type ChatUserListProps = {
  handleAddChat: () => unknown;
  ChatsComponent: UserItem[];
};
