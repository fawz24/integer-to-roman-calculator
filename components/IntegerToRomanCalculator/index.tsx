import { FC, useState } from "react";

export const MAX_SUPPORTED_ROMAN = 3999;

type DecimalPlaces = "units" | "tens" | "hundreds" | "thousands";

const lookup: Record<DecimalPlaces, string[]> = {
  units: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
  tens: ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
  hundreds: ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
  thousands: ["M", "MM", "MMM"],
};

/**
 * Converts a given integer value to roman notation
 * @param integer integer value to convert
 * @returns the integer value in roman numerals form
 */
const romanize = (integer: number) => {
  const indexToDecimalPlacesLookup: Record<number, DecimalPlaces> = {
    0: "units",
    1: "tens",
    2: "hundreds",
    3: "thousands",
  };
  const roman = Array.from(String(integer))
    .reverse()
    .reduce((romanized, digit, i) => {
      return `${
        lookup[indexToDecimalPlacesLookup[i]][Number(digit) - 1] ?? ""
      }${romanized}`;
    }, "");
  return roman;
};

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
