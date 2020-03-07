import {
    RENDER_HEIGHT, RENDER_WIDTH, DEBUG_COUNTER, UPDATE_TICK
} from 'engine/data/config';

import { GUI } from 'engine/ui';
import Input from 'engine/input';
import Scene from 'engine/scene';
import GAudio from 'engine/audio';
import { createView } from 'engine/view';
import Renderer from 'engine/graphics/renderer';
import SpriteAtlas from 'engine/graphics/atlas';
import { ComponentMap } from 'engine/ecs/component';

import StatCounter from 'engine/debug';
import EmptyCounter from 'engine/debug/empty';
import UpdateCounter from 'engine/debug/update';

type SceneID<T extends string> = 'INITIAL' | 'LOADING' | T;

export type Scenes<T extends string, U extends ComponentMap, V extends SpriteAtlas> = {
    readonly [id in SceneID<T>]: (audio: GAudio) => Scene<SceneID<T>, U, V>;
};

class Game<T extends string, U extends ComponentMap, V extends SpriteAtlas> {
    private readonly gui: GUI;
    private readonly input: Input;
    private readonly audio: GAudio;
    private readonly renderer: Renderer;
    private readonly counter: StatCounter;
    private readonly scenes: Scenes<T, U, V>;
    private readonly loadingScene: Scene<SceneID<T>, U, V>;

    private currentScene: Scene<SceneID<T>, U, V>;
    private isRunning = false;
    private lastUpdate = 0;
    private accum = 0;

    constructor(canvas: HTMLCanvasElement, gui: GUI, scenes: Scenes<T, U, V>) {
        const view = createView(RENDER_WIDTH, RENDER_HEIGHT);
        this.renderer = new Renderer(canvas, view);
        this.input = new Input(view);
        this.audio = new GAudio();
        this.gui = gui;

        if (DEBUG_COUNTER) {
            this.counter = new UpdateCounter(gui.debug.set);
        } else {
            this.counter = new EmptyCounter();
        }
        const loadingScene = scenes.LOADING(this.audio);

        this.scenes = scenes;
        this.loadingScene = loadingScene;
        this.currentScene = this.loadingScene;

        this.setScene('LOADING')
            .then(() => this.setScene('INITIAL'));
    }

    public start(): void {
        if (this.isRunning) {
            throw new Error('Game already running');
        }
        const now = performance.now();
        this.lastUpdate = now;
        this.isRunning = true;

        this.loop();
    }

    private loop = (): void => {
        if (!this.isRunning) {
            return;
        }
        requestAnimationFrame(this.loop);

        const newScene = this.currentScene.getNewScene();

        if (newScene) {
            this.setScene(newScene);
        }
        const now = performance.now();
        const delta = now - this.lastUpdate;

        this.accum += delta;
        this.lastUpdate = now;

        this.handleInput();

        while (this.accum >= UPDATE_TICK) {
            this.update();
            this.accum -= UPDATE_TICK;
        }
        this.render();
    };

    private handleInput(): void {
        const { input, currentScene } = this;
        input.update();
        currentScene.handleInput(input);
        input.reset();
    }

    private update(): void {
        const { currentScene, counter } = this;
        counter.updateStart();
        currentScene.update();
        counter.updateEnd();
    }

    private render(): void {
        const { gui, renderer, currentScene, counter } = this;
        counter.renderStart();
        currentScene.render(renderer, gui);
        counter.renderEnd();
    }

    private setScene(id: SceneID<T>): Promise<void> {
        const { audio, scenes } = this;
        this.currentScene = this.loadingScene;

        const scene = scenes[id](audio);

        return scene.load()
            .then(([textures, sounds]) => {
                this.renderer.setTextures(textures);
                this.audio.load(sounds);
                this.currentScene = scene;
            })
            .catch(console.error);
    }
}

export default Game;
