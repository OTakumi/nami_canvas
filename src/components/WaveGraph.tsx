"use client";

import { useMemo } from "react";
import { WaveGraphProps } from "@/types"; // 型定義をインポート

// propsの型としてWaveGraphPropsを指定
export default function WaveGraph({
  functionType,
  amplitude,
  frequency,
  width,
  height,
}: WaveGraphProps) {
  const pathData = useMemo(() => {
    // === ここに計算ロジックを実装 ===
    // 1. 0°から360°までの座標ポイントの配列を生成する
    // 2. 座標ポイントをSVGのパス文字列("M x1,y1 L x2,y2...")に変換する

    const calculatedPath = "..."; // 計算結果のパス文字列
    return calculatedPath;
  }, [functionType, amplitude, frequency, width, height]); // 依存配列

  return (
    <svg width={width} height={height} style={{ border: "1px solid #ccc" }}>
      {/* X軸やY軸などの補助線 */}
      <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#ddd" />

      {/* 計算した波形を描画するパス */}
      <path
        d={pathData} // 計算結果をここにセット
        stroke="royalblue"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
