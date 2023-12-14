import { Table } from "@tiptap/extension-table";
import { columnResizing, tableEditing } from "@tiptap/pm/tables";

const TableImproved = Table.extend({
  addProseMirrorPlugins() {
    const isResizable = this.options.resizable;

    return [
      ...(isResizable
        ? [
            columnResizing({
              handleWidth: this.options.handleWidth,
              cellMinWidth: this.options.cellMinWidth,
              // @ts-expect-error
              View: this.options.View,
              lastColumnResizable: this.options.lastColumnResizable,
            }),
          ]
        : []),

      tableEditing({
        allowTableNodeSelection: this.options.allowTableNodeSelection,
      }),
    ];
  },
});

export default TableImproved;
