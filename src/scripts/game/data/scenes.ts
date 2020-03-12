import { GameScenes } from 'game/scene';
import TetrisScene from 'game/scenes/tetris';
import LoadingScene from 'game/scenes/loading';

const scenes: GameScenes = {
    LOADING: audio => new LoadingScene(audio),
    INITIAL: audio => new TetrisScene(audio),
    TETRIS: audio => new TetrisScene(audio)
};

export default scenes;
