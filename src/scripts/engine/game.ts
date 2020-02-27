import {
    RENDER_HEIGHT, RENDER_WIDTH, DEBUG_COUNTER, UPDATE_TICK
} from 'engine/data/config';

import { GUI } from 'engine/ui';

import Input from 'engine/input';
import Scene from 'engine/scene';
import { createView } from 'engine/view';
import Renderer from 'engine/graphics/renderer';
import SpriteAtlas from 'engine/graphics/atlas';
import { ComponentMap } from 'engine/ecs/component';

import StatCounter from 'engine/debug';
import EmptyCounter from 'engine/debug/empty';
import UpdateCounter from 'engine/debug/update';

class Game<T extends string, U extends ComponentMap<T>, V extends SpriteAtlas<any>> {
    private readonly gui: GUI;
    private readonly input: Input;
    private readonly renderer: Renderer;
    private readonly counter: StatCounter;
    private readonly loadingScene: Scene<T, U, V>;

    private currentScene: Scene<T, U, V>;
    private isRunning = false;
    private lastUpdate = 0;
    private accum = 0;

    constructor(canvas: HTMLCanvasElement, gui: GUI, loadingScene: Scene<T, U, V>, initScene: Scene<T, U, V>) {
        const view = createView(RENDER_WIDTH, RENDER_HEIGHT);
        this.renderer = new Renderer(canvas, view);
        this.input = new Input(view);
        this.gui = gui;

        if (DEBUG_COUNTER) {
            this.counter = new UpdateCounter(gui.debug.set);
        } else {
            this.counter = new EmptyCounter();
        }
        this.loadingScene = loadingScene;
        this.currentScene = this.loadingScene;

        this.setScene(this.loadingScene)
            .then(() => this.setScene(initScene));
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
        this.counter.updateStart();
        this.currentScene.update();
        this.counter.updateEnd();
    }

    private render(): void {
        const { gui, renderer, currentScene } = this;
        this.counter.renderStart();
        currentScene.render(renderer, gui);
        this.counter.renderEnd();
    }

    private setScene(scene: Scene<T, U, V>): Promise<void> {
        this.currentScene = this.loadingScene;

        return scene.load()
            .then(textures => {
                this.renderer.setTextures(textures);
                this.currentScene = scene;
            })
            .catch(console.error);
    }
}

export default Game;
