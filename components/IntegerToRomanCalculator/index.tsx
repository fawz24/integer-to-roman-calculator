import { ChangeEventHandler, FC, useState } from "react";
import { MAX_SUPPORTED_ROMAN, romanize } from "./utils";

interface IntegerToRomanCalculatorProps {
  /** the mininum accepted integer */
  min?: number;
  /** the maxinum accepted integer */
  max?: number;
}

export const IntegerToRomanCalculator: FC<IntegerToRomanCalculatorProps> = ({
  min = 1,
  max = MAX_SUPPORTED_ROMAN,
}) => {
  const [integer, setInteger] = useState<number | undefined>();
  const roman = integer ? romanize(integer) : "";

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const num = Number(e.target.value);
    if (e.target.value.length === 0 || num === 0) {
      setInteger(undefined);
      return;
    }
    if (num < min || num > max) {
      return;
    }
    setInteger(num);
  };

  return (
    <div>
      <label>
        <h3>Integer</h3>
        <input
          type="number"
          min={min}
          max={max}
          value={integer?.toString() ?? ""}
          onChange={onChange}
          name="integer"
        />
      </label>
      <h3>Roman</h3>
      <p data-testid="roman-output">{roman}</p>
    </div>
  );
};
