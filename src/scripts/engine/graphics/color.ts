export type Color = [number, number, number, number];

export const createColor = (r: number, g: number, b: number, a = 255): Color => {
    return [r / 255, g / 255, b / 255, a / 255];
};
