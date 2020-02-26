import { PATH_IMAGES } from 'data/config';

export const loadImage = (path: string, img = new Image()): Promise<HTMLImageElement> => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        img.onerror = () => reject(new Error('Could not load texture: ' + path));
        img.onload = () => resolve(img);
        img.src = PATH_IMAGES + path;
    });
};
