import { createCamera } from 'engine/ecs/camera';
import GameScene from 'game/scene';

class LoadingScene extends GameScene {
    constructor() {
        super({
            camera: createCamera(),
            entities: [],
            textures: []
        });
    }

    public handleInput(): void {
        // do nothing
    }

    public update(): void {
        // do nothing
    }
}

export default LoadingScene;
