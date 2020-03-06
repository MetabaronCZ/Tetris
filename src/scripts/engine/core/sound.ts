import { PATH_SOUNDS } from 'engine/data/config';
import { TrackSource } from 'engine/audio';

export const loadSound = (ctx: AudioContext, id: string, path: string): Promise<TrackSource> => {
    return fetch(PATH_SOUNDS + path)
        .then(res => res.arrayBuffer())
        .then(buffer => ctx.decodeAudioData(buffer))
        .then(buffer => ({ id, buffer }));
};
