import { GUI } from 'engine/ui';

import Input from 'engine/input';
import { Camera } from 'engine/ecs/camera';
import { Entity } from 'engine/ecs/entity';
import SpriteAtlas from 'engine/graphics/atlas';
import { ComponentMap } from 'engine/ecs/component';
import Renderer, { Texture } from 'engine/graphics/renderer';

export interface SceneConf<T extends string, U extends ComponentMap<T>, V extends SpriteAtlas<any>> {
    readonly camera: Camera;
    readonly textures: V[];
    readonly entities: Partial<Entity<T, U>>[];
}

abstract class Scene<T extends string, U extends ComponentMap<T>, V extends SpriteAtlas<any>> {
    protected readonly camera: Camera;
    protected readonly textures: V[];
    protected readonly entities: Partial<Entity<T, U>>[] = [];
    protected newScene: Scene<T, U, V> | null = null;

    constructor(conf: SceneConf<T, U, V>) {
        this.camera = conf.camera;
        this.textures = conf.textures;
        this.entities = conf.entities;
    }

    public getNewScene(): Scene<T, U, V> | null {
        return this.newScene;
    }

    public load(): Promise<Texture[]> {
        const images = this.textures.map((atlas, i) => atlas.load(i));
        return Promise.all(images);
    }

    abstract handleInput(input: Input): void;
    abstract update(): void;

    abstract render(renderer: Renderer, gui: GUI): void;
}

export default Scene;
