import { FC, useState } from "react";

const lookup = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

/**
 * Converts a given integer value to roman notation
 * @param integer integer value to convert
 * @returns the integer value in roman numerals form
 */
const romanize = (integer: number) => {
  return lookup[integer - 1];
};

interface IntegerToRomanCalculatorProps {
  /** the mininum accepted integer */
  min?: number;
  /** the maxinum accepted integer */
  max?: number;
}

export const IntegerToRomanCalculator: FC<IntegerToRomanCalculatorProps> = ({
  min = 1,
  max = 3000,
}) => {
  const [integer, setInteger] = useState<number | undefined>();
  const roman = integer ? romanize(integer) : "";
  return (
    <div>
      <label>
        <span>Integer</span>
        <input
          type="number"
          min={min}
          max={max}
          value={integer?.toString() ?? ""}
          onChange={(e) => {
            const num = Number(e.target.value);
            if (e.target.value.length === 0 || num === 0) {
              setInteger(undefined);
              return;
            }
            if (num < min || num > max) {
              return;
            }
            setInteger(num);
          }}
          name="integer"
        />
      </label>
      <p data-testid="roman-output">{roman}</p>
    </div>
  );
};
