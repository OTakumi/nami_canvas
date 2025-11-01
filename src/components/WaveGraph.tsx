"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { WaveGraphProps } from "@/types";
import { generateWavePath } from "@/lib/waveUtils";

interface ExtendedWaveGraphProps extends WaveGraphProps {
  showGrid?: boolean;
  showAxisLabels?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
}

export function WaveGraph({
  functionType,
  amplitude,
  frequency,
  width,
  height,
  showGrid = true,
  showAxisLabels = true,
  strokeColor = "royalblue",
  strokeWidth = 2,
  className = "",
}: ExtendedWaveGraphProps) {
  const data = useMemo(() => {
    return generateWavePath({
      functionType,
      amplitude,
      frequency,
      width,
      height,
    });
  }, [functionType, amplitude, frequency, width, height]);

  // Y軸の目盛りを計算
  const yTicks = useMemo(() => {
    const ticks = [];
    const steps =
      amplitude <= 1 ? 5 : Math.min(Math.ceil(amplitude * 2) + 1, 9);

    for (let i = 0; i < steps; i++) {
      const value = amplitude - (i * (2 * amplitude)) / (steps - 1);
      ticks.push(Math.round(value * 10) / 10);
    }
    return ticks;
  }, [amplitude]);

  return (
    <div
      className={className}
      style={{ border: "1px solid #ccc", padding: "10px" }}
    >
      <ResponsiveContainer width={width + 60} height={height + 40}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="4 2" stroke="#ddd" />}

          {showAxisLabels && (
            <>
              <XAxis
                dataKey="angle"
                domain={[0, 360]}
                ticks={[0, 90, 180, 270, 360]}
                tickFormatter={(value) => `${value}°`}
                stroke="#666"
                fontSize={12}
              />
              <YAxis
                domain={[-amplitude, amplitude]}
                ticks={yTicks}
                stroke="#666"
                fontSize={12}
              />
            </>
          )}

          <Tooltip
            formatter={(value: number) => value.toFixed(3)}
            labelFormatter={(label) => `${label}°`}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            dot={false}
            animationDuration={0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// デフォルトエクスポートも提供（互換性のため）
export default WaveGraph;
