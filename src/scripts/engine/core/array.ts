export const getRandomArrayItem = <T>(arr: T[] | Readonly<T[]>): T => {
    const len = arr.length;

    if (!len) {
        throw new Error('Could not get random item of an empty array');
    }
    const index = Math.floor(len * Math.random());
    return arr[index];
};
