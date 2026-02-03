type Props = {
  children: React.ReactNode;
};

export const Paragraph = ({ children }: Props) => {
  return <p className="my-4 break-all">{children}</p>;
};
