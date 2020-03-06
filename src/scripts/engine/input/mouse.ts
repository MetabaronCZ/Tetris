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
    start: number | null; // button down timestamp
    end: number | null; // button up timestamp
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
                pressed: false,
                start: null,
                end: null
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

    public getPressedDuration(btn: MouseButtonID): number {
        const button = this.buttons[btn];

        if (null === button.start) {
            return 0;
        }
        const end = button.end || performance.now();
        return end - button.start;
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
            key.start = performance.now();
        }
    }

    public release(code: number): void {
        const id = buttonTable[code] || null;

        if (null !== id) {
            const key = this.buttons[id];
            key.up = true;
            key.down = false;
            key.pressed = false;
            key.end = performance.now();
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
            key.start = null;
            key.end = null;
        }
    }
}

export default Mouse;
