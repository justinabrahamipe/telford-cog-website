interface RGB {
  R: number;
  G: number;
  B: number;
}

interface LuminosityResult extends RGB {
  value: number;
}

export const isHex = (hex: string): boolean => {
  return new RegExp(/^#?[0-9A-F]{6}$/i).test(hex);
};

export const parseHex = (hex: string): string | false => {
  if (!isHex(hex))
    return false;

  return hex.replace("#", "").toUpperCase();
};

export const hexToRGB = (hex: string): RGB | false => {
  const parsedHex = parseHex(hex);

  if (!parsedHex)
    return false;

  const RGB: RGB = {
    R: parseInt(parsedHex[0] + parsedHex[1], 16),
    G: parseInt(parsedHex[2] + parsedHex[3], 16),
    B: parseInt(parsedHex[4] + parsedHex[5], 16),
  };

  return RGB;
};

export const luminosity = (hex: string): LuminosityResult | false => {
  const RGB = hexToRGB(hex);

  if (!RGB)
    return false;

  const factor = {
    R: 0.2126,
    G: 0.7152,
    B: 0.0772,
  };

  RGB.R = RGB.R * factor.R;
  RGB.G = RGB.G * factor.G;
  RGB.B = RGB.B * factor.B;

  const total = RGB.R + RGB.G + RGB.B;
  const value = parseFloat((total / 255).toFixed(2));

  return { ...RGB, value };
};