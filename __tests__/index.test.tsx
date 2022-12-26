import { fireEvent, render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
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
    render(<Home />);

    fireEvent.change(screen.getByLabelText("Integer"), {
      target: { value: input },
    });

    expect(screen.getByTestId("roman-output")).toHaveTextContent(
      RegExp(`^${output}$`)
    );
  });
});
