"use client";

import { useMemo } from "react";
import { WaveGraphProps } from "@/types";
import { generateWavePath } from "@/libs/waveUtils";

interface ExtendedWaveGraphProps extends WaveGraphProps {
  showGrid?: boolean;
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

  return (
    <svg 
      width={width} 
      height={height} 
      className={className}
      style={{ border: "1px solid #ccc" }}
    >
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

      {/* 波形パス */}
      <path
        d={pathData}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
}

// デフォルトエクスポートも提供（互換性のため）
export default WaveGraph;
