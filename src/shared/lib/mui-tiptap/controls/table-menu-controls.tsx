import FormatColorFill from "@mui/icons-material/FormatColorFill";
import GridOff from "@mui/icons-material/GridOff";

import MenuDivider from "./menu-divider";
import { useRichTextEditorContext } from "../context";
import DeleteColumn from "../icons/delete-column";
import MenuButton from "./menu-button";
import MenuControlsContainer from "./menu-controls-container";
import InsertColumnLeft from "../icons/insert-column-left";
import InsertColumnRight from "../icons/insert-column-right";
import InsertRowTop from "../icons/insert-row-top";
import InsertRowBottom from "../icons/insert-row-bottom";
import DeleteRow from "../icons/delete-row";
import MergeCellsHorizontal from "../icons/merge-cells-horizontal";
import SplitCellsHorizontal from "../icons/split-cells-horizontal";
import LayoutRowFill from "../icons/layout-row-fill";
import LayoutColumnFill from "../icons/layout-column-fill";

export type TableMenuControlsProps = {
  className?: string;

  labels?: {
    insertColumnBefore?: string;
    insertColumnAfter?: string;
    deleteColumn?: string;
    insertRowAbove?: string;
    insertRowBelow?: string;
    deleteRow?: string;
    mergeCells?: string;
    splitCell?: string;
    toggleHeaderRow?: string;
    toggleHeaderColumn?: string;
    toggleHeaderCell?: string;
    deleteTable?: string;
  };
};

export default function TableMenuControls({
  className,
  labels,
}: TableMenuControlsProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuControlsContainer className={className}>
      <MenuButton
        tooltipLabel={labels?.insertColumnBefore ?? "Insert column before"}
        IconComponent={InsertColumnLeft}
        onClick={() => editor?.chain().focus().addColumnBefore().run()}
        disabled={!editor?.can().addColumnBefore()}
      />

      <MenuButton
        tooltipLabel={labels?.insertColumnAfter ?? "Insert column after"}
        IconComponent={InsertColumnRight}
        onClick={() => editor?.chain().focus().addColumnAfter().run()}
        disabled={!editor?.can().addColumnAfter()}
      />

      <MenuButton
        tooltipLabel={labels?.deleteColumn ?? "Delete column"}
        IconComponent={DeleteColumn}
        onClick={() => editor?.chain().focus().deleteColumn().run()}
        disabled={!editor?.can().deleteColumn()}
      />

      <MenuDivider />

      <MenuButton
        tooltipLabel={labels?.insertRowAbove ?? "Insert row above"}
        IconComponent={InsertRowTop}
        onClick={() => editor?.chain().focus().addRowBefore().run()}
        disabled={!editor?.can().addRowBefore()}
      />

      <MenuButton
        tooltipLabel={labels?.insertRowBelow ?? "Insert row below"}
        IconComponent={InsertRowBottom}
        onClick={() => editor?.chain().focus().addRowAfter().run()}
        disabled={!editor?.can().addRowAfter()}
      />

      <MenuButton
        tooltipLabel={labels?.deleteRow ?? "Delete row"}
        IconComponent={DeleteRow}
        onClick={() => editor?.chain().focus().deleteRow().run()}
        disabled={!editor?.can().deleteRow()}
      />

      <MenuDivider />

      <MenuButton
        tooltipLabel={labels?.mergeCells ?? "Merge cells"}
        IconComponent={MergeCellsHorizontal}
        onClick={() => editor?.chain().focus().mergeCells().run()}
        disabled={!editor?.can().mergeCells()}
      />

      <MenuButton
        tooltipLabel={labels?.splitCell ?? "Split cell"}
        IconComponent={SplitCellsHorizontal}
        onClick={() => editor?.chain().focus().splitCell().run()}
        disabled={!editor?.can().splitCell()}
      />

      <MenuDivider />

      <MenuButton
        tooltipLabel={labels?.toggleHeaderRow ?? "Toggle header row"}
        IconComponent={LayoutRowFill}
        onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
        disabled={!editor?.can().toggleHeaderRow()}
      />

      <MenuButton
        tooltipLabel={labels?.toggleHeaderColumn ?? "Toggle header column"}
        IconComponent={LayoutColumnFill}
        onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}
        disabled={!editor?.can().toggleHeaderColumn()}
      />

      <MenuButton
        tooltipLabel={labels?.toggleHeaderCell ?? "Toggle header cell"}
        IconComponent={FormatColorFill}
        onClick={() => editor?.chain().focus().toggleHeaderCell().run()}
        disabled={!editor?.can().toggleHeaderCell()}
        selected={editor?.isActive("tableHeader") ?? false}
      />

      <MenuDivider />

      <MenuButton
        tooltipLabel={labels?.deleteTable ?? "Delete admin"}
        IconComponent={GridOff}
        onClick={() => editor?.chain().focus().deleteTable().run()}
        disabled={!editor?.can().deleteTable()}
      />
    </MenuControlsContainer>
  );
}
