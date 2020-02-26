import { UV } from 'engine/graphics/uv';

export interface SpriteDefinition {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}

export interface Sprite {
    readonly id: string;
    readonly uv: UV;
}
