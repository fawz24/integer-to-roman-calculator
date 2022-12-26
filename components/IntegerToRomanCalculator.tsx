import { FC, useState } from "react";

const romanize = (integer: number) => {
  return `Romanized ${integer}`;
};

interface IntegerToRomanCalculatorProps {
  min?: number;
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
      />
      <p>{roman}</p>
    </div>
  );
};
