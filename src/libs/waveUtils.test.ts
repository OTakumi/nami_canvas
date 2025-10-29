import { describe, it, expect, test } from "vitest";
import { generateWavePath } from "./waveUtils";
import { WaveFunction } from "@/types";

describe("generateWavePath", () => {
  /** SVG座標系の基本
   * 原点 (0,0): 描画エリアの左上
   * X軸: 右方向に向かって値が大きくなる
   * Y軸: 下方向に向かって値が大きくなる
   */
  describe("sin波の基本特性テスト", () => {
    it("sin関数の始点と終点が正しい座標を返すこと", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 1,
        width: 360, // 分かりやすくwidthを360にする
        height: 200,
      });

      // sin(0) = 0 なので、始点は(x=0, y=0)になる
      expect(path.startsWith("M 0.000,100.000")).toBe(true);
      // sin(360) = 0 なので、終点も(x=360, y=0)になる
      expect(path.endsWith("360.000,100.000")).toBe(true);
    });

    it("sin(90)の位置でY座標が正のピークになること", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 1,
        width: 360, // 分かりやすくwidthを360にする
        height: 200,
      });

      // sin(90) = 1 なので、(x=90, y=1)になる
      // amplitude=1, height=200, yCenter=100
      // y = 100 - 1 * 1 * (100 * 0.8) = 100 - 80 = 20
      expect(path.includes("90.000,20.000")).toBe(true);
    });
    it("sin(270)の位置でY座標が負のピークになること", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 1,
        width: 360, // 分かりやすくwidthを360にする
        height: 200,
      });

      // sin(270) = -1 なので、(x=270, y=-1)になる
      // y = 100 - (-1) * 1 * (100 * 0.8) = 100 + 80 = 180
      expect(path.includes("270.000,180.000")).toBe(true);
    });
  });

  describe("cos波の基本特性テスト", () => {
    it("cos関数の始点と終点が正しい座標を返すこと", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Cosine,
        amplitude: 1,
        frequency: 1,
        width: 360, // 分かりやすくwidthを360にする
        height: 200,
      });

      // cos(0) = 1 なので、始点は(x=0, y=1)になる
      expect(path.startsWith("M 0.000,20.000")).toBe(true);
      // cos(360) = 1 なので、終点も(x=360, y=1)になる
      expect(path.endsWith("360.000,20.000")).toBe(true);
    });

    it("cos(90)の位置でY座標が0(中央)になること", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Cosine,
        amplitude: 1,
        frequency: 1,
        width: 360, // 分かりやすくwidthを360にする
        height: 200,
      });

      // cos(90) = 0 なので、(x=90, y=0)になる
      // y = 100 - 0 * 1 * (100 * 0.8) = 100
      expect(path.includes("90.000,100.000")).toBe(true);
    });
    it("cos(270)の位置でY座標が0(中央)になること", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Cosine,
        amplitude: 1,
        frequency: 1,
        width: 360, // 分かりやすくwidthを360にする
        height: 200,
      });

      // cos(270) = 0 なので、(x=270, y=0)になる
      expect(path.includes("270.000,100.000")).toBe(true);
    });
  });

  describe("パラメータの適用", () => {
    it("sin波のamplitude（振幅）の値を2にすると、波のピークの高さが大きくなること", () => {
      /**
       * amplitudeが変更された場合、振幅が大きくなる
       * グラフの座標としては、正のピークは同じで、負のピークの値が大きくなる
       * */
      const path = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 2,
        frequency: 1,
        width: 360, // 分かりやすくwidthを360にする
        height: 200,
      });

      // sin(90) = 1 なので、(x=90, y=1)になる
      expect(path.includes("90.000,-60.000")).toBe(true);
      // sin(270) = -1 なので、(x=270, y=-1)になる
      // y = 100 - (-1) * 2 * (100 * 0.8) = 260
      expect(path.includes("270.000,260.000")).toBe(true);
    });

    it("sin波のfrequency（周波数）の値を2にすると、波が2周期分描画され、Y軸の中心を通過する回数が増えること", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 2,
        width: 360, // 分かりやすくwidthを360にする
        height: 200,
      });

      // 90° 地点 (x=90, y=100)
      expect(path.includes("90.000,100.000")).toBe(true);

      // 180° 地点 (x=180, y=100)
      expect(path.includes("180.000,100.000")).toBe(true);

      // 270° 地点 (x=270, y=100)
      expect(path.includes("270.000,100.000")).toBe(true);
    });
  });
});
