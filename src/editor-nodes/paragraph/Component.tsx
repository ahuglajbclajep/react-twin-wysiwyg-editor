import { paragraphStyle } from "../../nodes/Paragraph";

type Props = {
  children: React.ReactNode;
};

// TODO: Tiptap のバグが直ったら p タグで描画する
export const Component = ({ children }: Props) => {
  return <div className={paragraphStyle}>{children}</div>;
};
