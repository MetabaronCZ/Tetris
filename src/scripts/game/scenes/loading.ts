import { createCamera } from 'engine/ecs/camera';

import GAudio from 'engine/audio';
import GameScene from 'game/scene';

class LoadingScene extends GameScene {
    constructor(audio: GAudio) {
        super({
            audio,
            camera: createCamera(),
            sounds: [],
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

    public renderGUI(): void {
        // do nothing
    }
}

export default LoadingScene;
