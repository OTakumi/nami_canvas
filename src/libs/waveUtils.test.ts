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
  describe("異常系テスト", () => {
    it("widthが0の場合、空の文字列を返すこと", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 1,
        width: 0,
        height: 200,
      });

      expect(path).toBe("");
    });

    it("heightが0の場合でも正常にパスを生成すること", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 1,
        width: 360,
        height: 0,
      });

      // heightが0でもパスは生成される（全ての点がy=0になる）
      expect(path).toContain("M 0.000,0.000");
      expect(path).toContain("L");
    });

    it("amplitudeが0の場合、すべての点が中央線上になること", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 0,
        frequency: 1,
        width: 360,
        height: 200,
      });

      // amplitude=0の場合、すべての点がy=100（中央）になる
      expect(path).toContain("M 0.000,100.000");
      expect(path).toContain("100.000,100.000");
      expect(path).toContain("200.000,100.000");
    });

    it("frequencyが0の場合、波形が生成されないこと", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 0,
        width: 360,
        height: 200,
      });

      // frequency=0の場合、sin(0) = 0なのですべての点がy=100になる
      expect(path).toContain("M 0.000,100.000");
      // すべてのy座標が100.000であることを確認
      const yCoords = path.match(/,(\d+\.\d+)/g);
      expect(yCoords).toBeTruthy();
      expect(yCoords?.every((coord) => coord === ",100.000")).toBe(true);
    });

    it("負のamplitudeの場合、波形が反転すること", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: -1,
        frequency: 1,
        width: 360,
        height: 200,
      });

      // 負のamplitudeの場合、sin(90)の位置でy=180（下向きのピーク）
      expect(path).toContain("90.000,180.000");
      // sin(270)の位置でy=20（上向きのピーク）
      expect(path).toContain("270.000,20.000");
    });

    it("負のfrequencyの場合でも正常に動作すること", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: -1,
        width: 360,
        height: 200,
      });

      // 負のfrequencyは波形を逆向きにする
      // sin(-90) = -sin(90) = -1なので、x=90でy=180
      expect(path).toContain("90.000,180.000");
    });

    it("非常に大きな値でもパスが生成されること", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1000,
        frequency: 100,
        width: 10000,
        height: 10000,
      });

      expect(path).toBeTruthy();
      expect(path).toContain("M ");
      expect(path).toContain(" L ");
    });

    it("小数点を含むパラメータでも正常に動作すること", () => {
      const path = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 0.5,
        frequency: 1.5,
        width: 360.5,
        height: 200.5,
      });

      expect(path).toBeTruthy();
      expect(path).toContain("M ");
      expect(path).toMatch(/\d+\.\d{3}/); // 3桁の小数点を持つ数値
    });

    it("未知のWaveFunctionが渡された場合、波形がフラットになること", () => {
      const path = generateWavePath({
        functionType: "unknown" as WaveFunction,
        amplitude: 1,
        frequency: 1,
        width: 360,
        height: 200,
      });

      // 未知の関数の場合、yValue = 0となり、すべての点がy=100になる
      expect(path).toContain("M 0.000,100.000");
      expect(path).toContain("100.000,100.000");
    });
  });
});
