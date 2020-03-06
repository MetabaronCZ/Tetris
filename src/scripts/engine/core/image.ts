import { PATH_IMAGES } from 'engine/data/config';

export const loadImage = (path: string): Promise<HTMLImageElement> => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onerror = () => reject(new Error('Could not load texture: ' + path));
        img.onload = () => resolve(img);
        img.src = PATH_IMAGES + path;
    });
};
