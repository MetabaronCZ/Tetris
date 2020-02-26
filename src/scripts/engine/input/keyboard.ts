const keyIDs = ['ESC', 'ENTER', 'SPACE', 'UP', 'DOWN', 'LEFT', 'RIGHT'] as const;
export type KeyID = typeof keyIDs[number];

interface KeyTable {
    readonly [id: number]: KeyID;
}

const keyTable: KeyTable = {
    13: 'ENTER',
    27: 'ESC',
    32: 'SPACE',
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN'
};

interface Key {
    up: boolean;
    down: boolean;
    pressed: boolean;
}

export type Keys = {
    [id in KeyID]: Key;
};

class Keyboard {
    private readonly keys: Keys;

    constructor() {
        const keys: Partial<Keys> = {};

        for (const id of keyIDs) {
            keys[id] = {
                up: false,
                down: false,
                pressed: false
            };
        }
        this.keys = keys as Keys;
    }

    public isUp(key: KeyID): boolean {
        return this.keys[key].up;
    }

    public isDown(key: KeyID): boolean {
        return this.keys[key].down;
    }

    public isPressed(key: KeyID): boolean {
        return this.keys[key].pressed;
    }

    public press(code: number): void {
        const id = keyTable[code] || null;

        if (null !== id) {
            const key = this.keys[id];

            if (!key.pressed) {
                key.up = false;
                key.down = true;
                key.pressed = true;
            }
        }
    }

    public release(code: number): void {
        const id = keyTable[code] || null;

        if (null !== id) {
            const key = this.keys[id];
            key.up = true;
            key.down = false;
            key.pressed = false;
        }
    }

    public reset(): void {
        for (const id of keyIDs) {
            const key = this.keys[id];
            key.up = false;
            key.down = false;
        }
    }
}

export default Keyboard;
