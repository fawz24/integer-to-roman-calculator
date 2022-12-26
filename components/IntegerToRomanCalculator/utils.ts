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
export const romanize = (integer: number) => {
  const indexToDecimalPlacesLookup: Record<number, DecimalPlaces> = {
    0: "units",
    1: "tens",
    2: "hundreds",
    3: "thousands",
  };
  if (integer < 1 || integer > MAX_SUPPORTED_ROMAN || integer != integer) {
    return "";
  }
  const roman = Array.from(String(integer))
    .reverse()
    .reduce((romanized, digit, i) => {
      return `${
        lookup[indexToDecimalPlacesLookup[i]][Number(digit) - 1] ?? ""
      }${romanized}`;
    }, "");
  return roman;
};
