import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { WaveControlPanel } from "./WaveControlPanel";
import { WaveFunction } from "@/types";

describe("WaveControlPanel", () => {
  const mockProps = {
    functionType: WaveFunction.Sine,
    frequency: 1,
    amplitude: 1,
    onFunctionTypeChange: vi.fn(),
    onFrequencyChange: vi.fn(),
    onAmplitudeChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("コンポーネントが正しくレンダリングされる", () => {
    render(<WaveControlPanel {...mockProps} />);

    // タイトルが表示される
    expect(screen.getByText("Wave Parameters")).toBeTruthy();

    // 各ラベルが表示される
    expect(screen.getByText("Wave Type")).toBeTruthy();
    expect(screen.getByText("Frequency")).toBeTruthy();
    expect(screen.getByText("Amplitude")).toBeTruthy();

    // 入力フィールドが存在する
    expect(screen.getByRole("combobox", { name: /wave type/i })).toBeTruthy();
    expect(screen.getByRole("spinbutton", { name: /frequency/i })).toBeTruthy();
    expect(screen.getByRole("spinbutton", { name: /amplitude/i })).toBeTruthy();
  });

  it("初期値が正しく表示される", () => {
    render(<WaveControlPanel {...mockProps} />);

    // Wave Typeの初期値
    expect(
      screen.getByRole("combobox", { name: /wave type/i }).textContent,
    ).toContain("Sin");

    // Frequencyの初期値
    expect(
      (
        screen.getByRole("spinbutton", {
          name: /frequency/i,
        }) as HTMLInputElement
      ).value,
    ).toBe("1");

    // Amplitudeの初期値
    expect(
      (
        screen.getByRole("spinbutton", {
          name: /amplitude/i,
        }) as HTMLInputElement
      ).value,
    ).toBe("1");
  });

  it("波形タイプ選択が動作する", () => {
    render(<WaveControlPanel {...mockProps} />);

    const select = screen.getByRole("combobox", { name: /wave type/i });

    // Selectを開く
    fireEvent.click(select);

    // Cosを選択
    const cosOption = screen.getByRole("option", { name: "Cos" });
    fireEvent.click(cosOption);

    // コールバックが呼ばれる
    expect(mockProps.onFunctionTypeChange).toHaveBeenCalledWith(
      WaveFunction.Cosine,
    );
  });

  it("周波数入力が動作する", () => {
    render(<WaveControlPanel {...mockProps} />);

    const frequencyInput = screen.getByRole("spinbutton", {
      name: /frequency/i,
    });

    // 値を変更
    fireEvent.change(frequencyInput, { target: { value: "2.5" } });

    // コールバックが呼ばれる
    expect(mockProps.onFrequencyChange).toHaveBeenCalledWith(2.5);
  });

  it("振幅入力が動作する", () => {
    render(<WaveControlPanel {...mockProps} />);

    const amplitudeInput = screen.getByRole("spinbutton", {
      name: /amplitude/i,
    });

    // 値を変更
    fireEvent.change(amplitudeInput, { target: { value: "3.0" } });

    // コールバックが呼ばれる
    expect(mockProps.onAmplitudeChange).toHaveBeenCalledWith(3);
  });

  it("異なるpropsで再レンダリングされる", () => {
    const { rerender } = render(<WaveControlPanel {...mockProps} />);

    // 新しいpropsでレンダリング
    const newProps = {
      ...mockProps,
      functionType: WaveFunction.Cosine,
      frequency: 2,
      amplitude: 1.5,
    };

    rerender(<WaveControlPanel {...newProps} />);

    // 新しい値が表示される
    expect(
      screen.getByRole("combobox", { name: /wave type/i }).textContent,
    ).toContain("Cos");
    expect(
      (
        screen.getByRole("spinbutton", {
          name: /frequency/i,
        }) as HTMLInputElement
      ).value,
    ).toBe("2");
    expect(
      (
        screen.getByRole("spinbutton", {
          name: /amplitude/i,
        }) as HTMLInputElement
      ).value,
    ).toBe("1.5");
  });

  it("数値入力フィールドに適切な属性が設定されている", () => {
    render(<WaveControlPanel {...mockProps} />);

    const frequencyInput = screen.getByRole("spinbutton", {
      name: /frequency/i,
    });
    const amplitudeInput = screen.getByRole("spinbutton", {
      name: /amplitude/i,
    });

    // Frequency入力の属性
    expect(frequencyInput.getAttribute("type")).toBe("number");
    expect(frequencyInput.getAttribute("min")).toBe("0");
    expect(frequencyInput.getAttribute("max")).toBe("10");
    expect(frequencyInput.getAttribute("step")).toBe("0.1");

    // Amplitude入力の属性
    expect(amplitudeInput.getAttribute("type")).toBe("number");
    expect(amplitudeInput.getAttribute("min")).toBe("0");
    expect(amplitudeInput.getAttribute("max")).toBe("5");
    expect(amplitudeInput.getAttribute("step")).toBe("0.1");
  });
});

