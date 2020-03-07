import { loadSound } from 'engine/core/sound';

import { GUI } from 'engine/ui';
import Input from 'engine/input';
import SpriteAtlas from 'engine/graphics/atlas';
import GAudio, { TrackSource } from 'engine/audio';
import Renderer, { Texture } from 'engine/graphics/renderer';

import { Entity } from 'engine/ecs/entity';
import { ComponentMap } from 'engine/ecs/component';
import { Camera, createCamera } from 'engine/ecs/entities/camera';

export interface SceneConf<T extends ComponentMap, U extends SpriteAtlas> {
    readonly audio: GAudio;
    readonly camera?: Camera;
    readonly textures?: U[];
    readonly sounds?: Array<[string, string]>;
    readonly entities?: Entity<Partial<T>>[];
}

export type SceneAssets = [Texture[], TrackSource[]];

abstract class Scene<T extends string, U extends ComponentMap, V extends SpriteAtlas> {
    protected readonly audio: GAudio;
    protected readonly camera: Camera;
    protected readonly textures: V[];
    protected readonly sounds: Array<[string, string]>;
    protected readonly entities: Entity<Partial<U>>[] = [];
    protected newScene: T | null = null;

    constructor(conf: SceneConf<U, V>) {
        this.audio = conf.audio;
        this.camera = conf.camera || createCamera();
        this.sounds = conf.sounds || [];
        this.textures = conf.textures || [];
        this.entities = conf.entities || [];
    }

    public getNewScene(): T | null {
        return this.newScene;
    }

    public load(): Promise<SceneAssets> {
        const audioCtx = this.audio.getContext();
        const images = this.textures.map((atlas, i) => atlas.load(i));
        const sounds = this.sounds.map(([id, sound]) => loadSound(audioCtx, id, sound));

        return Promise.all([
            Promise.all(images),
            Promise.all(sounds)
        ]);
    }

    abstract handleInput(input: Input): void;
    abstract update(): void;

    abstract render(renderer: Renderer, gui: GUI): void;
}

export default Scene;
