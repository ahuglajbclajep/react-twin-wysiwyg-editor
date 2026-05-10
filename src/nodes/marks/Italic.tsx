type Props = {
  children: React.ReactNode;
};

export const Italic = ({ children }: Props) => {
  return <em>{children}</em>;
};
