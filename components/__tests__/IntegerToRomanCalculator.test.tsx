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
  ])("converts integers from 1 to 9 - (%i -> %s)", (input, output) => {
    render(<IntegerToRomanCalculator min={1} max={9} />);

    fireEvent.change(screen.getByLabelText("Integer"), {
      target: { value: input },
    });

    expect(screen.getByTestId("roman-output")).toHaveTextContent(
      RegExp(`^${output}$`)
    );
  });
});
