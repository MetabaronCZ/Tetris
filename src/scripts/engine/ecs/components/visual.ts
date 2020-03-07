import { Color } from 'engine/graphics/color';
import { Sprite } from 'engine/graphics/sprite';
import { Component } from 'engine/ecs/component';
import { Rectangle } from 'engine/geometry/rectangle';
import { Quad, createQuad } from 'engine/graphics/quad';

class Visual extends Component {
    public readonly shape: Rectangle;
    public readonly vertices: Quad;
    public readonly color: Color;
    private sprite: Sprite;

    constructor(sprite: Sprite, shape: Rectangle, color: Color) {
        super();
        this.sprite = sprite;
        this.color = color;
        this.shape = shape;
        this.vertices = createQuad();
    }

    public getSprite(): Sprite {
        return this.sprite;
    }

    public setSprite(sprite: Sprite): void {
        this.sprite = sprite;
    }
}

export default Visual;
