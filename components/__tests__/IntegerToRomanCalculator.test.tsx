import { fireEvent, render, screen } from "@testing-library/react";
import {
  IntegerToRomanCalculator,
  MAX_SUPPORTED_ROMAN,
} from "@/components/IntegerToRomanCalculator";

describe("IntegerToRomanCalculator", () => {
  it.each([
    [1, "I"],
    [2, "II"],
    [3, "III"],
    [4, "IV"],
    [5, "V"],
    [6, "VI"],
    [7, "VII"],
    [8, "VIII"],
    [9, "IX"],
  ])("converts integers from 1 to 9 | (%i -> %s)", (input, output) => {
    render(<IntegerToRomanCalculator min={1} max={9} />);

    fireEvent.change(screen.getByLabelText("Integer"), {
      target: { value: input },
    });

    expect(screen.getByTestId("roman-output")).toHaveTextContent(
      RegExp(`^${output}$`)
    );
  });

  it.each([
    [10, "X"],
    [20, "XX"],
    [30, "XXX"],
    [40, "XL"],
    [50, "L"],
    [60, "LX"],
    [70, "LXX"],
    [80, "LXXX"],
    [90, "XC"],
  ])("converts multiples of 10 from 10 to 90 | (%i -> %s)", (input, output) => {
    render(<IntegerToRomanCalculator min={10} max={90} />);

    fireEvent.change(screen.getByLabelText("Integer"), {
      target: { value: input },
    });

    expect(screen.getByTestId("roman-output")).toHaveTextContent(
      RegExp(`^${output}$`)
    );
  });

  it.each([
    [100, "C"],
    [200, "CC"],
    [300, "CCC"],
    [400, "CD"],
    [500, "D"],
    [600, "DC"],
    [700, "DCC"],
    [800, "DCCC"],
    [900, "CM"],
  ])(
    "converts multiples of 100 from 100 to 900 | (%i -> %s)",
    (input, output) => {
      render(<IntegerToRomanCalculator min={100} max={900} />);

      fireEvent.change(screen.getByLabelText("Integer"), {
        target: { value: input },
      });

      expect(screen.getByTestId("roman-output")).toHaveTextContent(
        RegExp(`^${output}$`)
      );
    }
  );

  it.each([
    [1000, "M"],
    [2000, "MM"],
    [3000, "MMM"],
  ])(
    "converts multiples of 1000 from 1000 to 3000 | (%i -> %s)",
    (input, output) => {
      render(<IntegerToRomanCalculator min={1000} max={3000} />);

      fireEvent.change(screen.getByLabelText("Integer"), {
        target: { value: input },
      });

      expect(screen.getByTestId("roman-output")).toHaveTextContent(
        RegExp(`^${output}$`)
      );
    }
  );

  it.each([
    [39, "XXXIX"],
    [17, "XVII"],
    [94, "XCIV"],
    [160, "CLX"],
    [207, "CCVII"],
    [246, "CCXLVI"],
    [789, "DCCLXXXIX"],
    [1009, "MIX"],
    [1066, "MLXVI"],
    [2022, "MMXXII"],
    [2421, "MMCDXXI"],
    [MAX_SUPPORTED_ROMAN, "MMMCMXCIX"],
  ])("converts custom integer values | (%i -> %s)", (input, output) => {
    render(<IntegerToRomanCalculator min={1} max={MAX_SUPPORTED_ROMAN} />);
    const inputElement = screen.getByLabelText("Integer");

    fireEvent.change(inputElement, {
      target: { value: input },
    });

    expect(inputElement).toHaveValue(input);
    expect(screen.getByTestId("roman-output")).toHaveTextContent(
      RegExp(`^${output}$`)
    );
  });

  it.each([-38, 0, MAX_SUPPORTED_ROMAN + 1])(
    "doest not convert out of range integer values | (%i)",
    (input) => {
      render(<IntegerToRomanCalculator min={1} max={MAX_SUPPORTED_ROMAN} />);
      const inputElement = screen.getByLabelText("Integer");

      fireEvent.change(inputElement, {
        target: { value: input },
      });

      expect(inputElement).toHaveValue(null);
      expect(screen.getByTestId("roman-output")).toHaveTextContent("");
    }
  );
});
