import type { Meta, StoryObj } from "@storybook/react";
import { WaveGraph } from "@/components/WaveGraph";
import { WaveFunction } from "@/types";

const meta = {
  title: "Components/WaveGraph",
  component: WaveGraph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    functionType: {
      control: "select",
      options: Object.values(WaveFunction),
      description: "波形の種類",
    },
    amplitude: {
      control: { type: "range", min: 0, max: 5, step: 0.1 },
      description: "波の振幅",
    },
    frequency: {
      control: { type: "range", min: 0, max: 10, step: 0.1 },
      description: "波の周波数",
    },
    width: {
      control: { type: "range", min: 100, max: 800, step: 50 },
      description: "グラフの幅",
    },
    height: {
      control: { type: "range", min: 100, max: 400, step: 50 },
      description: "グラフの高さ",
    },
    showGrid: {
      control: "boolean",
      description: "グリッド線の表示/非表示",
    },
    strokeColor: {
      control: "color",
      description: "波形の色",
    },
    strokeWidth: {
      control: { type: "range", min: 1, max: 10, step: 0.5 },
      description: "線の太さ",
    },
  },
} satisfies Meta<typeof WaveGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なSin波
export const SineWave: Story = {
  args: {
    functionType: WaveFunction.Sine,
    amplitude: 1,
    frequency: 1,
    width: 400,
    height: 200,
    showGrid: true,
    strokeColor: "royalblue",
    strokeWidth: 2,
  },
};

// 基本的なCos波
export const CosineWave: Story = {
  args: {
    functionType: WaveFunction.Cosine,
    amplitude: 1,
    frequency: 1,
    width: 400,
    height: 200,
    showGrid: true,
    strokeColor: "crimson",
    strokeWidth: 2,
  },
};

// 高振幅のSin波
export const HighAmplitude: Story = {
  args: {
    functionType: WaveFunction.Sine,
    amplitude: 2,
    frequency: 1,
    width: 600,
    height: 300,
    showGrid: true,
    strokeColor: "forestgreen",
    strokeWidth: 3,
  },
};

// 高周波数のSin波
export const HighFrequency: Story = {
  args: {
    functionType: WaveFunction.Sine,
    amplitude: 1,
    frequency: 3,
    width: 600,
    height: 200,
    showGrid: true,
    strokeColor: "darkorange",
    strokeWidth: 2,
  },
};

// グリッドなし
export const NoGrid: Story = {
  args: {
    functionType: WaveFunction.Cosine,
    amplitude: 1.5,
    frequency: 2,
    width: 500,
    height: 250,
    showGrid: false,
    strokeColor: "mediumpurple",
    strokeWidth: 4,
  },
};

// インタラクティブなプレイグラウンド
export const Playground: Story = {
  args: {
    functionType: WaveFunction.Sine,
    amplitude: 1,
    frequency: 1,
    width: 600,
    height: 300,
    showGrid: true,
    strokeColor: "steelblue",
    strokeWidth: 2,
  },
  parameters: {
    docs: {
      description: {
        story: "すべてのパラメータを自由に調整できるインタラクティブなプレイグラウンドです。",
      },
    },
  },
};