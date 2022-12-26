import { ChangeEventHandler, FC, useState } from "react";
import { MAX_SUPPORTED_ROMAN, romanize } from "./utils";
import styles from "./index.module.css";

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
    <div className={styles.container}>
      <label className={styles.inputContainer}>
        <h3 className={styles.heading}>Integer</h3>
        <input
          className={styles.input}
          type="number"
          min={min}
          max={max}
          value={integer?.toString() ?? ""}
          onChange={onChange}
          name="integer"
        />
      </label>
      <div className={styles.divider}></div>
      <div className={styles.outputContainer}>
        <h3 className={styles.heading}>Roman</h3>
        <p className={styles.roman} data-testid="roman-output">
          {roman}
        </p>
      </div>
    </div>
  );
};
