import { rgbToHex } from "@mui/material";
import { Maybe } from "api/graphql/generated/graphql";

export function colorToHex(color: string): Maybe<string> {
  try {
    return rgbToHex(color);
  } catch (err) {
    return null;
  }
}
