export type Color = [number, number, number, number];

export const createColor = (r: number, g: number, b: number, a = 255): Color => {
    return [r / 255, g / 255, b / 255, a / 255];
};

// change color alpha (values 0.0 - 1.0)
export const setColorAlpha = (color: Color, alpha: number): void => {
    color[3] = alpha;
};
