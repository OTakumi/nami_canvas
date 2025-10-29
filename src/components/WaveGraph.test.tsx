import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { WaveGraph } from "./WaveGraph";
import { WaveFunction } from "@/types";

describe("WaveGraph", () => {
  describe("基本的なレンダリング", () => {
    it("SVG要素がレンダリングされること", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Sine}
          amplitude={1}
          frequency={1}
          width={400}
          height={200}
        />,
      );

      const svg = container.querySelector("svg");
      expect(svg).toBeTruthy();
      expect(svg?.getAttribute("width")).toBe("400");
      expect(svg?.getAttribute("height")).toBe("200");
    });

    it("波形のパスがレンダリングされること", () => {
      const { container } = render(
        <WaveGraph
          functionType={WaveFunction.Sine}
          amplitude={1}
          frequency={1}
          width={400}
          height={200}
        />,
      );

      const path = container.querySelector("path");
      expect(path).toBeTruthy();
      expect(path?.hasAttribute("d")).toBe(true);
      expect(path?.getAttribute("d")).toContain("M ");
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

      // 水平線（中央線）
      const horizontalLine = container.querySelector(
        "line[y1='100'][y2='100']",
      );
      expect(horizontalLine).toBeTruthy();
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

      const path = container.querySelector("path");
      const d = path?.getAttribute("d") || "";

      // Sin波の特徴：始点が中央（y=100）
      expect(d).toContain("M 0.000,100.000");
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

      const path = container.querySelector("path");
      const d = path?.getAttribute("d") || "";

      // Cos波の特徴：始点が上部（y=20）
      expect(d).toContain("M 0.000,20.000");
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

      const path = container.querySelector("path");
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

      const svg = container.querySelector("svg");
      expect(svg?.classList.contains("custom-wave-graph")).toBe(true);
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

      const svg = container.querySelector("svg");
      expect(svg).toBeTruthy();

      const path = container.querySelector("path");
      // 空のパスまたは存在しない
      expect(path?.getAttribute("d") || "").toBe("");
    });
  });
});

