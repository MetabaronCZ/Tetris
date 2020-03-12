import { RENDER_SCALE } from 'engine/data/config';

import { View } from 'engine/view';
import { Vector2D } from 'engine/geometry/vector';
import Keyboard, { KeyID } from 'engine/input/keyboard';
import Mouse, { MouseButtonID } from 'engine/input/mouse';

const mouseInView = (x: number, y: number, view: View): boolean => {
    return (
        x >= view.x
        && y >= view.y
        && x <= view.x + view.width
        && y <= view.y + view.height
    );
};

class Input {
    private readonly mouse: Mouse;
    private readonly keyboard: Keyboard;

    private isMouseVisible = false;
    private mouseNormalized: Vector2D | null = null;

    constructor() {
        this.mouse = new Mouse();
        this.keyboard = new Keyboard();

        this.bindEvents();
    }

    public getMousePosition(): Vector2D | null {
        return this.mouseNormalized;
    }

    public isMouseUp(btn: MouseButtonID): boolean {
        return this.mouse.isUp(btn);
    }

    public isMouseDown(btn: MouseButtonID): boolean {
        return this.mouse.isDown(btn);
    }

    public isMousePressed(btn: MouseButtonID): boolean {
        return this.mouse.isPressed(btn);
    }

    public isKeyUp(key: KeyID): boolean {
        return this.keyboard.isUp(key);
    }

    public isKeyDown(key: KeyID): boolean {
        return this.keyboard.isDown(key);
    }

    public isKeyPressed(key: KeyID): boolean {
        return this.keyboard.isPressed(key);
    }

    public update(view: View): void {
        const { mouse, isMouseVisible } = this;
        this.mouseNormalized = null;

        let [mx, my] = mouse.getPosition();
        mx *= RENDER_SCALE;
        my *= RENDER_SCALE;

        if (isMouseVisible && mouseInView(mx, my, view)) {
            this.mouseNormalized = [
                (mx - view.x) / view.width,
                (my - view.y) / view.height
            ];
        }
    }

    public reset(): void {
        this.mouse.reset();
        this.keyboard.reset();
    }

    private bindEvents(): void {
        document.addEventListener('mouseenter', e => {
            this.isMouseVisible = true;
            this.mouse.move(e.clientX, e.clientY);
        });

        document.addEventListener('mouseleave', () => {
            this.isMouseVisible = false;
        });

        document.addEventListener('mousemove', e => {
            this.isMouseVisible = true;
            this.mouse.move(e.clientX, e.clientY);
        });

        document.addEventListener('mousedown', e => {
            this.mouse.press(e.button);
        });

        document.addEventListener('mouseup', e => {
            this.mouse.release(e.button);
        });

        document.addEventListener('keydown', e => {
            this.keyboard.press(e.keyCode || e.which);
        });

        document.addEventListener('keyup', e => {
            this.keyboard.release(e.keyCode || e.which);
        });
    }
}

export default Input;
