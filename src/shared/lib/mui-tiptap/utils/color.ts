import { rgbToHex } from "@mui/material";

export function colorToHex(color: string): string | null {
  try {
    return rgbToHex(color);
  } catch (err) {
    return null;
  }
}
