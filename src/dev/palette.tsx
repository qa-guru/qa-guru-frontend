import { Palette } from "@react-buddy/ide-toolbox";
import AntdPalette from "@react-buddy/palette-antd";
import ReactIntlPalette from "@react-buddy/palette-react-intl";

export const PaletteTree = () => (
  <Palette>
    <ReactIntlPalette />
    <AntdPalette />
  </Palette>
);
