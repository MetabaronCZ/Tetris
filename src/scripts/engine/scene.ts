import { loadSound } from 'engine/core/sound';

import { GUI } from 'engine/ui';
import Input from 'engine/input';
import GAudio, { TrackSource } from 'engine/audio';
import SpriteAtlas from 'engine/graphics/atlas';
import Renderer, { Texture } from 'engine/graphics/renderer';

import { Camera } from 'engine/ecs/camera';
import { Entity } from 'engine/ecs/entity';
import { ComponentMap } from 'engine/ecs/component';

export interface SceneConf<T extends string, U extends ComponentMap<T>, V extends SpriteAtlas<any>> {
    readonly audio: GAudio;
    readonly camera: Camera;
    readonly textures: V[];
    readonly sounds: Array<[string, string]>;
    readonly entities: Partial<Entity<T, U>>[];
}

export type SceneAssets = [Texture[], TrackSource[]];

abstract class Scene<S extends string, T extends string, U extends ComponentMap<T>, V extends SpriteAtlas<any>> {
    protected readonly audio: GAudio;
    protected readonly camera: Camera;
    protected readonly textures: V[];
    protected readonly sounds: Array<[string, string]>;
    protected readonly entities: Partial<Entity<T, U>>[] = [];
    protected newScene: S | null = null;

    constructor(conf: SceneConf<T, U, V>) {
        this.audio = conf.audio;
        this.camera = conf.camera;
        this.sounds = conf.sounds;
        this.textures = conf.textures;
        this.entities = conf.entities;
    }

    public getNewScene(): S | null {
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
