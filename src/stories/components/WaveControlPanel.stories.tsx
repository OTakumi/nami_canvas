import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { WaveControlPanel } from "@/components/WaveControlPanel";
import { WaveFunction } from "@/types";

const meta = {
  title: "Components/WaveControlPanel",
  component: WaveControlPanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    functionType: {
      control: "select",
      options: Object.values(WaveFunction),
      description: "現在選択されている波形タイプ",
    },
    amplitude: {
      control: { type: "range", min: 0, max: 5, step: 0.1 },
      description: "現在の振幅値",
    },
    frequency: {
      control: { type: "range", min: 0, max: 10, step: 0.1 },
      description: "現在の周波数値",
    },
    onFunctionTypeChange: {
      description: "波形タイプ変更時のコールバック",
    },
    onFrequencyChange: {
      description: "周波数変更時のコールバック",
    },
    onAmplitudeChange: {
      description: "振幅変更時のコールバック",
    },
  },
} satisfies Meta<typeof WaveControlPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なコントロールパネル
export const Default: Story = {
  args: {
    functionType: WaveFunction.Sine,
    amplitude: 1,
    frequency: 1,
    onFunctionTypeChange: () => {},
    onFrequencyChange: () => {},
    onAmplitudeChange: () => {},
  },
};

// インタラクティブなコンポーネント（状態管理付き）
export const Interactive: Story = {
  render: () => {
    const [functionType, setFunctionType] = useState<WaveFunction>(WaveFunction.Sine);
    const [frequency, setFrequency] = useState(1);
    const [amplitude, setAmplitude] = useState(1);

    return (
      <div className="space-y-4">
        <WaveControlPanel
          functionType={functionType}
          frequency={frequency}
          amplitude={amplitude}
          onFunctionTypeChange={setFunctionType}
          onFrequencyChange={setFrequency}
          onAmplitudeChange={setAmplitude}
        />
        <div className="p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Current Values:</h4>
          <ul className="space-y-1 text-sm">
            <li>Wave Type: {functionType}</li>
            <li>Frequency: {frequency}</li>
            <li>Amplitude: {amplitude}</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "実際の状態管理を含むインタラクティブな例。値を変更すると下に現在の値が表示されます。",
      },
    },
  },
};

// Cos波が選択された状態
export const WithCosine: Story = {
  args: {
    functionType: WaveFunction.Cosine,
    amplitude: 1.5,
    frequency: 2,
    onFunctionTypeChange: () => {},
    onFrequencyChange: () => {},
    onAmplitudeChange: () => {},
  },
};

// 高周波数・高振幅の設定
export const HighValues: Story = {
  args: {
    functionType: WaveFunction.Sine,
    amplitude: 4,
    frequency: 8,
    onFunctionTypeChange: () => {},
    onFrequencyChange: () => {},
    onAmplitudeChange: () => {},
  },
};

// 最小値の設定
export const MinimumValues: Story = {
  args: {
    functionType: WaveFunction.Sine,
    amplitude: 0,
    frequency: 0,
    onFunctionTypeChange: () => {},
    onFrequencyChange: () => {},
    onAmplitudeChange: () => {},
  },
};

// カスタムスタイリング（親要素から）
export const WithCustomContainer: Story = {
  args: {
    functionType: WaveFunction.Sine,
    amplitude: 1,
    frequency: 1,
    onFunctionTypeChange: () => {},
    onFrequencyChange: () => {},
    onAmplitudeChange: () => {},
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-blue-50 rounded-lg">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "親要素でカスタムスタイリングを適用した例",
      },
    },
  },
};