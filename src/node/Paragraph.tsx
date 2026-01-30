type Props = {
  children: React.ReactNode;
};

export const Paragraph = ({ children }: Props) => {
  return <p className="break-all text-base my-4">{children}</p>;
};
