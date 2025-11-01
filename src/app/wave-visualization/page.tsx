"use client";

import { useState } from "react";
import { WaveGraph } from "@/components/WaveGraph";
import { WaveControlPanel } from "@/components/WaveControlPanel";
import { WaveFunction } from "@/types";

export default function WaveVisualizationPage() {
  const [functionType, setFunctionType] = useState<WaveFunction>(
    WaveFunction.Sine,
  );
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(1);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Wave Visualization</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <WaveControlPanel
            functionType={functionType}
            frequency={frequency}
            amplitude={amplitude}
            onFunctionTypeChange={setFunctionType}
            onFrequencyChange={setFrequency}
            onAmplitudeChange={setAmplitude}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="border rounded-lg p-4 bg-white">
            <WaveGraph
              functionType={functionType}
              frequency={frequency}
              amplitude={amplitude}
              width={600}
              height={400}
              showGrid={true}
              showAxisLabels={true}
              strokeColor="royalblue"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Current Parameters</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium">Wave Type:</span>{" "}
            {functionType === WaveFunction.Sine ? "Sine" : "Cosine"}
          </div>
          <div>
            <span className="font-medium">Frequency:</span> {frequency}
          </div>
          <div>
            <span className="font-medium">Amplitude:</span> {amplitude}
          </div>
        </div>
      </div>
    </div>
  );
}

