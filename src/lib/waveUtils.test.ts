import { describe, it, expect } from "vitest";
import { generateWavePath, WaveDataPoint } from "./waveUtils";
import { WaveFunction } from "@/types";

describe("generateWavePath", () => {
  /** データポイントの基本
   * angle: 0-360度の角度
   * value: その角度での波形の値（-amplitude から +amplitude の範囲）
   */
  describe("sin波の基本特性テスト", () => {
    it("sin関数の始点と終点が正しい値を返すこと", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 1,
        width: 360,
        height: 200,
      });

      // sin(0) = 0 なので、始点のvalueは0
      expect(points[0]).toEqual({ angle: 0, value: 0 });
      // sin(360) = 0 なので、終点のvalueも0
      const lastPoint = points[points.length - 1];
      expect(lastPoint).toEqual({ angle: 360, value: 0 });
    });

    it("sin(90)の位置で値が正のピークになること", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 1,
        width: 360,
        height: 200,
      });

      // sin(90) = 1 なので、angle=90でvalue=1
      const point90 = points.find(p => p.angle === 90);
      expect(point90).toEqual({ angle: 90, value: 1 });
    });
    it("sin(270)の位置で値が負のピークになること", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 1,
        width: 360,
        height: 200,
      });

      // sin(270) = -1 なので、angle=270でvalue=-1
      const point270 = points.find(p => p.angle === 270);
      expect(point270).toEqual({ angle: 270, value: -1 });
    });
  });

  describe("cos波の基本特性テスト", () => {
    it("cos関数の始点と終点が正しい値を返すこと", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Cosine,
        amplitude: 1,
        frequency: 1,
        width: 360,
        height: 200,
      });

      // cos(0) = 1 なので、始点のvalueは1
      expect(points[0]).toEqual({ angle: 0, value: 1 });
      // cos(360) = 1 なので、終点のvalueも1
      const lastPoint = points[points.length - 1];
      expect(lastPoint).toEqual({ angle: 360, value: 1 });
    });

    it("cos(90)の位置で値が0になること", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Cosine,
        amplitude: 1,
        frequency: 1,
        width: 360,
        height: 200,
      });

      // cos(90) = 0 なので、angle=90でvalue=0
      const point90 = points.find(p => p.angle === 90);
      expect(point90).toEqual({ angle: 90, value: 0 });
    });
    it("cos(270)の位置で値が0になること", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Cosine,
        amplitude: 1,
        frequency: 1,
        width: 360,
        height: 200,
      });

      // cos(270) = 0 なので、angle=270でvalue=0
      const point270 = points.find(p => p.angle === 270);
      expect(point270).toEqual({ angle: 270, value: 0 });
    });
  });

  describe("パラメータの適用", () => {
    it("sin波のamplitude（振幅）の値を2にすると、波のピークの高さが大きくなること", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 2,
        frequency: 1,
        width: 360,
        height: 200,
      });

      // sin(90) = 1 * amplitude = 2
      const point90 = points.find(p => p.angle === 90);
      expect(point90).toEqual({ angle: 90, value: 2 });
      // sin(270) = -1 * amplitude = -2
      const point270 = points.find(p => p.angle === 270);
      expect(point270).toEqual({ angle: 270, value: -2 });
    });

    it("sin波のfrequency（周波数）の値を2にすると、波が2周期分描画され、値が0になる回数が増えること", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 2,
        width: 360,
        height: 200,
      });

      // frequency=2の場合、180度で2周期になる
      // sin(2*90) = sin(180) = 0
      const point90 = points.find(p => p.angle === 90);
      expect(point90).toEqual({ angle: 90, value: 0 });

      // sin(2*180) = sin(360) = 0
      const point180 = points.find(p => p.angle === 180);
      expect(point180).toEqual({ angle: 180, value: 0 });

      // sin(2*270) = sin(540) = sin(180) = 0
      const point270 = points.find(p => p.angle === 270);
      expect(point270).toEqual({ angle: 270, value: 0 });
    });
  });
  describe("異常系テスト", () => {
    it("widthが0の場合、空の配列を返すこと", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 1,
        width: 0,
        height: 200,
      });

      expect(points).toEqual([]);
    });

    it("heightが0の場合でも正常にデータポイントを生成すること", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 1,
        width: 360,
        height: 0,
      });

      // heightが0でもデータポイントは生成される
      expect(points.length).toBeGreaterThan(0);
      expect(points[0]).toHaveProperty('angle');
      expect(points[0]).toHaveProperty('value');
    });

    it("amplitudeが0の場合、すべての値が0になること", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 0,
        frequency: 1,
        width: 360,
        height: 200,
      });

      // amplitude=0の場合、すべてのvalueが0になる
      expect(points.every(p => p.value === 0)).toBe(true);
    });

    it("frequencyが0の場合、すべての値が0になること", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: 0,
        width: 360,
        height: 200,
      });

      // frequency=0の場合、sin(0) = 0なのですべてのvalueが0
      expect(points.every(p => p.value === 0)).toBe(true);
    });

    it("負のamplitudeの場合、波形が反転すること", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: -1,
        frequency: 1,
        width: 360,
        height: 200,
      });

      // 負のamplitudeの場合、値の符号が反転する
      // sin(90) = 1, amplitude = -1 なので value = -1
      const point90 = points.find(p => p.angle === 90);
      expect(point90).toEqual({ angle: 90, value: -1 });
      // sin(270) = -1, amplitude = -1 なので value = 1
      const point270 = points.find(p => p.angle === 270);
      expect(point270).toEqual({ angle: 270, value: 1 });
    });

    it("負のfrequencyの場合でも正常に動作すること", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1,
        frequency: -1,
        width: 360,
        height: 200,
      });

      // 負のfrequencyは波形を逆向きにする
      // sin(-90) = -sin(90) = -1
      const point90 = points.find(p => p.angle === 90);
      expect(point90).toEqual({ angle: 90, value: -1 });
    });

    it("非常に大きな値でもデータポイントが生成されること", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 1000,
        frequency: 100,
        width: 10000,
        height: 10000,
      });

      expect(points).toBeTruthy();
      expect(points.length).toBeGreaterThan(0);
      expect(points[0]).toHaveProperty('angle');
      expect(points[0]).toHaveProperty('value');
    });

    it("小数点を含むパラメータでも正常に動作すること", () => {
      const points = generateWavePath({
        functionType: WaveFunction.Sine,
        amplitude: 0.5,
        frequency: 1.5,
        width: 360.5,
        height: 200.5,
      });

      expect(points).toBeTruthy();
      expect(points.length).toBeGreaterThan(0);
      // valueが小数点3桁に丸められていることを確認
      const hasDecimalValue = points.some(p => p.value !== Math.floor(p.value));
      expect(hasDecimalValue).toBe(true);
    });

    it("未知のWaveFunctionが渡された場合、波形がフラットになること", () => {
      const points = generateWavePath({
        functionType: "unknown" as WaveFunction,
        amplitude: 1,
        frequency: 1,
        width: 360,
        height: 200,
      });

      // 未知の関数の場合、yValue = 0となり、すべてのvalueが0になる
      expect(points.every(p => p.value === 0)).toBe(true);
    });
  });
});
