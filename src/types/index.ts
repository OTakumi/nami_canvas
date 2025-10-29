/**
 * 式の種類
 * @enum {string}
 */
export enum WaveFunction {
  Sine = "sin",
  Cosine = "cos",
}

/**
 * グラフ描画コンポーネントが受け取るプロパティの型定義
 */
export interface WaveGraphProps {
  /** 描画する関数の種類 */
  functionType: WaveFunction;

  /** 波の振幅（高さ） */
  amplitude: number;

  /** 波の周波数（0〜360°の間にいくつ波があるか） */
  frequency: number;

  /** SVG描画領域の幅 */
  width: number;

  /** SVG描画領域の高さ */
  height: number;
}

/**
 * 操作パネルコンポーネントが受け取るプロパティの型定義
 */
export interface WaveControlsProps {
  /** 現在選択されている関数の種類 */
  functionType: WaveFunction;

  /** 現在の振幅 */
  amplitude: number;

  /** 現在の周波数 */
  frequency: number;

  /**
   * 関数の種類が変更されたときに呼び出されるコールバック関数
   * @param newType 新しく選択された関数の種類
   */
  onFunctionTypeChange: (newType: WaveFunction) => void;

  /**
   * 振幅が変更されたときに呼び出されるコールバック関数
   * @param newAmplitude 新しい振幅の値
   */
  onAmplitudeChange: (newAmplitude: number) => void;

  /**
   * 周波数が変更されたときに呼び出されるコールバック関数
   * @param newFrequency 新しい周波数の値
   */
  onFrequencyChange: (newFrequency: number) => void;
}
