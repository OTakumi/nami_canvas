import { WaveFunction } from "@/types";

/**
 * 波形データポイントの型定義
 */
export interface WaveDataPoint {
  angle: number;
  value: number;
}

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
 * 波形グラフのデータポイントを生成する純粋関数
 * @param params - グラフの描画に必要なパラメータ
 * @returns 角度と値のデータポイントの配列
 */
export const generateWavePath = ({
  functionType,
  amplitude,
  frequency,
  width,
  height,
}: GenerateWavePathParams): WaveDataPoint[] => {
  // widthが0以下の場合は空配列を返す
  if (width <= 0) {
    return [];
  }
  
  const points: WaveDataPoint[] = [];
  const step = 1;

  for (let angle = 0; angle <= 360; angle += step) {
    const radian = angle * (Math.PI / 180);
    let yValue = 0;

    // y値の計算
    if (functionType === WaveFunction.Sine) {
      yValue = Math.sin(radian * frequency) * amplitude;
    } else if (functionType === WaveFunction.Cosine) {
      yValue = Math.cos(radian * frequency) * amplitude;
    }

    // 小数点3桁に丸め、-0を0に変換
    const roundedValue = Math.round(yValue * 1000) / 1000;
    points.push({
      angle,
      value: roundedValue === 0 ? 0 : roundedValue,
    });
  }

  return points;
};
