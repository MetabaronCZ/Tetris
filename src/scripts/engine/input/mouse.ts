import { vec2, Vector2D } from 'engine/geometry/vector';

const mouseButtonIDs = ['LMB', 'MMB', 'RMB'] as const;
export type MouseButtonID = typeof mouseButtonIDs[number];

interface MouseButtonTable {
    readonly [id: number]: MouseButtonID;
}

const buttonTable: MouseButtonTable = {
    0: 'LMB',
    1: 'MMB',
    2: 'RMB'
};

interface MouseButton {
    up: boolean;
    down: boolean;
    pressed: boolean;
}

export type MouseButtons = {
    [id in MouseButtonID]: MouseButton;
};

class Mouse {
    private readonly buttons: MouseButtons;
    private readonly position = vec2.zero();

    constructor() {
        const buttons: Partial<MouseButtons> = {};

        for (const id of mouseButtonIDs) {
            buttons[id] = {
                up: false,
                down: false,
                pressed: false
            };
        }
        this.buttons = buttons as MouseButtons;
    }

    public isUp(btn: MouseButtonID): boolean {
        return this.buttons[btn].up;
    }

    public isDown(btn: MouseButtonID): boolean {
        return this.buttons[btn].down;
    }

    public isPressed(btn: MouseButtonID): boolean {
        return this.buttons[btn].pressed;
    }

    public getPosition(): Vector2D {
        return this.position;
    }

    public press(code: number): void {
        const id = buttonTable[code] || null;

        if (null !== id) {
            const key = this.buttons[id];
            key.up = false;
            key.down = true;
            key.pressed = true;
        }
    }

    public release(code: number): void {
        const id = buttonTable[code] || null;

        if (null !== id) {
            const key = this.buttons[id];
            key.up = true;
            key.down = false;
            key.pressed = false;
        }
    }

    public move(x: number, y: number): void {
        vec2.set(this.position, x, y);
    }

    public reset(): void {
        for (const id of mouseButtonIDs) {
            const key = this.buttons[id];
            key.up = false;
            key.down = false;
        }
    }
}

export default Mouse;
