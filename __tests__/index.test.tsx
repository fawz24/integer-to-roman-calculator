import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Integer to Roman Numeral Calculator/i,
    });
    const input = screen.getByLabelText(/Integer/i);
    const output = screen.getByTestId(/roman-output/i);

    expect(heading).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(output).toBeInTheDocument();
  });
});
