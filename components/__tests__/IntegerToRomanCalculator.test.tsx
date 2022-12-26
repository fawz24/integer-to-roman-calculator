import { fireEvent, render, screen } from "@testing-library/react";
import { IntegerToRomanCalculator } from "@/components/IntegerToRomanCalculator";

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
    [39, "XXXIX"],
    [17, "XVII"],
    [94, "XCIV"],
  ])("converts custom integer values | (%i -> %s)", (input, output) => {
    render(<IntegerToRomanCalculator min={1} max={1000} />);

    fireEvent.change(screen.getByLabelText("Integer"), {
      target: { value: input },
    });

    expect(screen.getByTestId("roman-output")).toHaveTextContent(
      RegExp(`^${output}$`)
    );
  });

  const max = 1000;
  it.each([-38, 0, max + 1])(
    "doest not convert out of range integer values | (%i)",
    (input) => {
      render(<IntegerToRomanCalculator min={1} max={max} />);
      const inputElement = screen.getByLabelText("Integer");

      fireEvent.change(inputElement, {
        target: { value: input },
      });

      expect(inputElement).toHaveValue(null);
      expect(screen.getByTestId("roman-output")).toHaveTextContent("");
    }
  );
});
