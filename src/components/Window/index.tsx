import { WindowsRoot } from "./Windows";
import { WindowsContent } from "./WindowsContent";
import { WindowsTitleBar } from "./WindowsTitleBar";

export const Windows = Object.assign(WindowsRoot, {
  TitleBar: WindowsTitleBar,
  Content: WindowsContent,
});
