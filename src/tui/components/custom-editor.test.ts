import { setKittyProtocolActive } from "@mariozechner/pi-tui";
import { describe, expect, it } from "vitest";
import { isShiftEnterInput } from "./custom-editor.js";

describe("isShiftEnterInput", () => {
  it.each(["\x1b[13;2~", "\x1b[13;2u", "\x1b[27;2;13~"])(
    "matches known shift+enter sequence %j",
    (value) => {
      expect(isShiftEnterInput(value)).toBe(true);
    },
  );

  it("does not treat plain enter as shift+enter", () => {
    expect(isShiftEnterInput("\r")).toBe(false);
  });

  it("matches shift+enter when kitty protocol mode maps it to newline", () => {
    setKittyProtocolActive(false);
    expect(isShiftEnterInput("\n")).toBe(false);
    setKittyProtocolActive(true);
    expect(isShiftEnterInput("\n")).toBe(true);
    setKittyProtocolActive(false);
  });
});
