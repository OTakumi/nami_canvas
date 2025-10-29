import { describe, it, expect, test } from "vitest";
import { generateWavePath } from "./waveUtils";
import { WaveFunction } from "@/types";

describe("generateWavePath", () => {
  it("sin関数の始点と終点が正しい座標を返すこと", () => {
    const path = generateWavePath({
      functionType: WaveFunction.Sine,
      amplitude: 1,
      frequency: 1,
      width: 360, // 分かりやすくwidthを360にする
      height: 200,
    });

    // sin(0) = 0 なので、始点は(x=0, y=中央)になるはず
    expect(path.startsWith("M 0.000,100.000")).toBe(true);
    // sin(360) = 0 なので、終点も(x=360, y=中央)になるはず
    expect(path.endsWith("360.000,100.000")).toBe(true);
  });
});
