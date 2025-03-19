"use client";

import {
  SettingsContext,
  useSettings,
} from "@/components/editor/context/SettingsContext";
import { SharedAutocompleteContext } from "@/components/editor/context/SharedAutocompleteContext";
import { SharedHistoryContext } from "@/components/editor/context/SharedHistoryContext";
import Editor from "@/components/editor/editor";
import { isDevPlayground } from "@/components/editor/lib/appSettings";
import Settings from "@/components/editor/lib/Settings";
import PlaygroundNodes from "@/components/editor/nodes/PlaygroundNodes";
import DocsPlugin from "@/components/editor/plugins/DocsPlugin";
import PasteLogPlugin from "@/components/editor/plugins/PasteLogPlugin";
import { TableContext } from "@/components/editor/plugins/TablePlugin";
import PlaygroundEditorTheme from "@/components/editor/themes/PlaygroundEditorTheme";
import { getPrepopulatedRichText } from "@/components/editor/utils/getPrepopulatedRichText";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

export default function LexicalEditor({ value, onChange }) {
  const {
    settings: { emptyEditor },
  } = useSettings();

  const initialConfig = {
    editorState: emptyEditor ? undefined : getPrepopulatedRichText,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <SettingsContext>
      <LexicalComposer initialConfig={{ ...initialConfig, editorState: value }}>
        <SharedHistoryContext>
          <TableContext>
            <SharedAutocompleteContext>
              <div className="editor-shell border border-slate-300">
                <Editor onChange={onChange} />
              </div>
              <Settings />
              {isDevPlayground ? <DocsPlugin /> : null}
              {isDevPlayground ? <PasteLogPlugin /> : null}
            </SharedAutocompleteContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </SettingsContext>
  );
}
