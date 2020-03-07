import GAudio from 'engine/audio';
import GameScene from 'game/scene';

class LoadingScene extends GameScene {
    constructor(audio: GAudio) {
        super({ audio });
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
