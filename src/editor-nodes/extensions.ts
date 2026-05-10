import { Document } from "./other-nodes/Document";
import { Paragraph } from "./paragraph";

import { Text } from "./marks/Text";
import { Bold } from "./marks/Bold";
import { Italic } from "./marks/Italic";

export const nodes = [Document, Paragraph];

export const marks = [Text, Bold, Italic];
