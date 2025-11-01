"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WaveFunction } from "@/types";

interface WaveControlPanelProps {
  functionType: WaveFunction;
  frequency: number;
  amplitude: number;
  onFunctionTypeChange: (value: WaveFunction) => void;
  onFrequencyChange: (value: number) => void;
  onAmplitudeChange: (value: number) => void;
}

export function WaveControlPanel({
  functionType,
  frequency,
  amplitude,
  onFunctionTypeChange,
  onFrequencyChange,
  onAmplitudeChange,
}: WaveControlPanelProps) {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Wave Parameters</h3>

      <div className="space-y-2">
        <Label htmlFor="wave-type">Wave Type</Label>
        <Select
          value={functionType}
          onValueChange={(value) => onFunctionTypeChange(value as WaveFunction)}
        >
          <SelectTrigger id="wave-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={WaveFunction.Sine}>Sin</SelectItem>
            <SelectItem value={WaveFunction.Cosine}>Cos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="frequency">Frequency</Label>
        <Input
          id="frequency"
          type="number"
          value={frequency}
          onChange={(e) => onFrequencyChange(Number(e.target.value))}
          min="0"
          max="10"
          step="0.1"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amplitude">Amplitude</Label>
        <Input
          id="amplitude"
          type="number"
          value={amplitude}
          onChange={(e) => onAmplitudeChange(Number(e.target.value))}
          min="0"
          max="5"
          step="0.1"
        />
      </div>
    </div>
  );
}

