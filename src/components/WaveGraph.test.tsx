import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { WaveGraph } from "./WaveGraph";
import { WaveFunction } from "@/types";

describe("WaveGraph", () => {
  describe("基本的なレンダリング", () => {
    it("コンテナ要素がレンダリングされること", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Sine}
          amplitude={1}
          frequency={1}
          width={400}
          height={200}
        />,
      );

      // 基本的なコンテナdivが存在することを確認
      const containerDiv = container.querySelector('div');
      expect(containerDiv).toBeTruthy();
      
      // SVG要素がレンダリングされることを確認（Rechartsが内部でSVGを生成）
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it("波形のラインがレンダリングされること", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Sine}
          amplitude={1}
          frequency={1}
          width={400}
          height={200}
        />,
      );

      // Recharts Lineコンポーネントをチェック
      const line = container.querySelector(".recharts-line");
      expect(line).toBeTruthy();
      
      // Lineの中のパス要素をチェック
      const path = container.querySelector(".recharts-line path");
      expect(path).toBeTruthy();
      expect(path?.hasAttribute("d")).toBe(true);
    });

    it("グリッド線がレンダリングされること", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Sine}
          amplitude={1}
          frequency={1}
          width={400}
          height={200}
          showGrid={true}
        />,
      );

      // Recharts CartesianGridをチェック
      const cartesianGrid = container.querySelector(".recharts-cartesian-grid");
      expect(cartesianGrid).toBeTruthy();
      
      // グリッド線が存在することを確認
      const gridLines = container.querySelectorAll(".recharts-cartesian-grid line");
      expect(gridLines.length).toBeGreaterThan(0);
    });
  });

  describe("異なる波形タイプ", () => {
    it("Sin波が正しくレンダリングされること", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Sine}
          amplitude={1}
          frequency={1}
          width={400}
          height={200}
        />,
      );

      // Rechartsのラインが存在することを確認
      const line = container.querySelector(".recharts-line");
      expect(line).toBeTruthy();
      
      // パス要素が存在することを確認
      const path = container.querySelector(".recharts-line path");
      expect(path).toBeTruthy();
      expect(path?.hasAttribute("d")).toBe(true);
    });

    it("Cos波が正しくレンダリングされること", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Cosine}
          amplitude={1}
          frequency={1}
          width={400}
          height={200}
        />,
      );

      // Rechartsのラインが存在することを確認
      const line = container.querySelector(".recharts-line");
      expect(line).toBeTruthy();
      
      // パス要素が存在することを確認
      const path = container.querySelector(".recharts-line path");
      expect(path).toBeTruthy();
      expect(path?.hasAttribute("d")).toBe(true);
    });
  });

  describe("スタイリング", () => {
    it("波形に適切なスタイルが適用されること", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Sine}
          amplitude={1}
          frequency={1}
          width={400}
          height={200}
          strokeColor="#ff0000"
          strokeWidth={3}
        />,
      );

      // Recharts Lineのパス要素をチェック
      const path = container.querySelector(".recharts-line path");
      expect(path?.getAttribute("stroke")).toBe("#ff0000");
      expect(path?.getAttribute("stroke-width")).toBe("3");
      expect(path?.getAttribute("fill")).toBe("none");
    });

    it("classNameが適用されること", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Sine}
          amplitude={1}
          frequency={1}
          width={400}
          height={200}
          className="custom-wave-graph"
        />,
      );

      // コンテナdivにclassNameが適用されることをチェック
      const waveGraphContainer = container.querySelector(".custom-wave-graph");
      expect(waveGraphContainer).toBeTruthy();
    });
  });

  describe("エラーハンドリング", () => {
    it("width=0の場合でも安全にレンダリングされること", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Sine}
          amplitude={1}
          frequency={1}
          width={0}
          height={200}
        />,
      );

      // 基本的なコンテナdivが存在することを確認
      const containerDiv = container.querySelector('div');
      expect(containerDiv).toBeTruthy();
      
      // SVG要素がレンダリングされることを確認（Rechartsが内部でSVGを生成）
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  });

  describe("軸ラベル", () => {
    it("軸ラベルが表示されること", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Sine}
          amplitude={1}
          frequency={1}
          width={400}
          height={200}
          showAxisLabels={true}
        />,
      );

      // RechartsのX軸
      const xAxis = container.querySelector(".recharts-xAxis");
      expect(xAxis).toBeTruthy();
      
      // RechartsのY軸
      const yAxis = container.querySelector(".recharts-yAxis");
      expect(yAxis).toBeTruthy();
      
      // X軸のラベル（ticks）
      const xLabels = container.querySelectorAll(".recharts-xAxis .recharts-text");
      expect(xLabels.length).toBeGreaterThan(0);
      
      // Y軸のラベル（ticks）
      const yLabels = container.querySelectorAll(".recharts-yAxis .recharts-text");
      expect(yLabels.length).toBeGreaterThan(0);
    });

    it("X軸に角度のラベルが表示されること", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Sine}
          amplitude={1}
          frequency={1}
          width={400}
          height={200}
          showAxisLabels={true}
        />,
      );

      // RechartsのX軸ラベルを取得
      const labels = Array.from(container.querySelectorAll(".recharts-xAxis .recharts-text"));
      const labelTexts = labels.map(label => label.textContent);
      
      // 角度ラベルが正しくフォーマットされていることを確認
      expect(labelTexts).toContain("0°");
      expect(labelTexts).toContain("90°");
      expect(labelTexts).toContain("180°");
      expect(labelTexts).toContain("270°");
      expect(labelTexts).toContain("360°");
    });

    it("Y軸に振幅値のラベルが表示されること", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Sine}
          amplitude={2}
          frequency={1}
          width={400}
          height={200}
          showAxisLabels={true}
        />,
      );

      // RechartsのY軸ラベルを取得
      const labels = Array.from(container.querySelectorAll(".recharts-yAxis .recharts-text"));
      const labelTexts = labels.map(label => label.textContent);
      
      // 振幅値のラベルが含まれていることを確認
      expect(labelTexts).toContain("2");
      expect(labelTexts).toContain("0");
      expect(labelTexts).toContain("-2");
      // 中間値も含まれる可能性がある
      expect(labelTexts.length).toBeGreaterThan(0);
    });

    it("showAxisLabels=falseの場合、軸ラベルが表示されないこと", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Sine}
          amplitude={1}
          frequency={1}
          width={400}
          height={200}
          showAxisLabels={false}
        />,
      );

      // RechartsのX軸とY軸が存在しないことを確認
      const xAxis = container.querySelector(".recharts-xAxis");
      expect(xAxis).toBeFalsy();
      
      const yAxis = container.querySelector(".recharts-yAxis");
      expect(yAxis).toBeFalsy();
    });
  });
});

