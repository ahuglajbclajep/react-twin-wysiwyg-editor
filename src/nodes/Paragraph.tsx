import clsx from "clsx/lite";

type Props = {
  children: React.ReactNode;
};

export const Paragraph = ({ children }: Props) => {
  return <p className={paragraphStyle}>{children}</p>;
};

export const paragraphStyle = clsx("my-4 break-all");
