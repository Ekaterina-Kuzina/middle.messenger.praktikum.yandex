export type InputProps = {
  label: string;
  name: string;
  labelLeft: boolean;
  type: string;
  value: string;
  className?: string;
  readonly?: 'readonly';
  error?: string;
  onBlur?: () => void;
};
