import { Windows } from "../Window";
import { WindowUrlTitleBar } from "../Window/WindowsUrlTitleBar";
import { NotesWindowContent } from "./NotesWindowContent";

export const NotesWindow = () => (
  <Windows name="notes" width="980px" height="640px">
    <Windows.TitleBar>
      <WindowUrlTitleBar url="jfcorsini.com/blog" iconName="Notes" />
    </Windows.TitleBar>
    <Windows.Content>
      <NotesWindowContent />
    </Windows.Content>
  </Windows>
);
