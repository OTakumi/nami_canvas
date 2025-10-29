"use client";

import { useMemo } from "react";
import { WaveGraphProps } from "@/types";
import { generateWavePath } from "@/libs/waveUtils";

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
  const pathData = useMemo(() => {
    return generateWavePath({
      functionType,
      amplitude,
      frequency,
      width,
      height,
    });
  }, [functionType, amplitude, frequency, width, height]);

  // 軸ラベルの計算
  const xLabels = useMemo(() => {
    const labels = [];
    for (let i = 0; i <= 4; i++) {
      const angle = i * 90;
      const x = (angle / 360) * width;
      labels.push({ x, angle });
    }
    return labels;
  }, [width]);

  const yLabels = useMemo(() => {
    const labels = [];
    const maxValue = amplitude;
    const steps = amplitude <= 1 ? 5 : Math.min(Math.ceil(amplitude * 2) + 1, 9);
    
    for (let i = 0; i < steps; i++) {
      const value = maxValue - (i * (2 * maxValue) / (steps - 1));
      const y = height / 2 - value * (height / 2) * 0.8 / maxValue;
      labels.push({ y, value: Math.round(value * 10) / 10 });
    }
    return labels;
  }, [amplitude, height]);

  return (
    <svg 
      width={width + 60} 
      height={height + 40} 
      className={className}
      style={{ border: "1px solid #ccc" }}
    >
      <g transform="translate(30, 20)">
        {/* グリッド線 */}
        {showGrid && (
          <>
            {/* 水平中央線 */}
            <line 
              x1="0" 
              y1={height / 2} 
              x2={width} 
              y2={height / 2} 
              stroke="#ddd" 
              strokeDasharray="4 2"
            />
            
            {/* 垂直ガイド線（90度ごと） */}
            {[0.25, 0.5, 0.75].map((ratio) => (
              <line
                key={ratio}
                x1={width * ratio}
                y1="0"
                x2={width * ratio}
                y2={height}
                stroke="#eee"
                strokeDasharray="4 2"
              />
            ))}
          </>
        )}

        {/* 軸ラベル */}
        {showAxisLabels && (
          <>
            {/* X軸ラベル（角度） */}
            {xLabels.map(({ x, angle }) => (
              <text
                key={angle}
                x={x}
                y={height + 15}
                className="x-label"
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                {angle}°
              </text>
            ))}

            {/* Y軸ラベル（振幅） */}
            {yLabels.map(({ y, value }) => (
              <text
                key={value}
                x={-10}
                y={y + 4}
                className="y-label"
                textAnchor="end"
                fontSize="12"
                fill="#666"
              >
                {value}
              </text>
            ))}
          </>
        )}

        {/* 波形パス */}
        <path
          d={pathData}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </g>
    </svg>
  );
}

// デフォルトエクスポートも提供（互換性のため）
export default WaveGraph;
