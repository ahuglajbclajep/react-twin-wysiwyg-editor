type Props = {
  children: React.ReactNode;
};

export const Bold = ({ children }: Props) => {
  return <strong className="font-bold">{children}</strong>;
};
