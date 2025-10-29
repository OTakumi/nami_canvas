// src/lib/waveUtils.ts

import { WaveFunction } from "@/types";

/**
 * generateWavePath関数の引数の型定義
 */
export interface GenerateWavePathParams {
  functionType: WaveFunction;
  amplitude: number;
  frequency: number;
  width: number;
  height: number;
}

/**
 * 波形グラフのSVGパスデータを生成する純粋関数
 * @param params - グラフの描画に必要なパラメータ
 * @returns SVGのd属性に設定するパス文字列
 */
export const generateWavePath = ({
  functionType,
  amplitude,
  frequency,
  width,
  height,
}: GenerateWavePathParams): string => {
  // --- ここに、前回実装した計算ロジックをそのまま移動 ---
  const points: string[] = [];
  const yCenter = height / 2;
  const step = 1;

  for (let angle = 0; angle <= 360; angle += step) {
    const x = (angle / 360) * width;
    const radian = angle * (Math.PI / 180);
    let yValue = 0;

    if (functionType === WaveFunction.Sine) {
      yValue = Math.sin(radian * frequency);
    } else if (functionType === WaveFunction.Cosine) {
      yValue = Math.cos(radian * frequency);
    }

    // Y座標の計算式は変更なし
    const y = yCenter - yValue * amplitude * (yCenter * 0.8);

    points.push(`${x.toFixed(3)},${y.toFixed(3)}`); // toFixedで数値を丸めておくとデータが安定する
  }

  if (points.length === 0) {
    return "";
  }

  return `M ${points[0]} L ${points.slice(1).join(" ")}`;
};
