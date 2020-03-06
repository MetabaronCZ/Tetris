import Game from 'engine/game';

import { initGameGUI } from 'game/ui';
import { GameScenes } from 'game/scene';
import TetrisScene from 'game/scenes/tetris';
import LoadingScene from 'game/scenes/loading';

const canvas = document.querySelector<HTMLCanvasElement>('.Canvas');
const guiRoot = document.querySelector<HTMLDivElement>('.GUI');

if (!canvas || !guiRoot) {
    throw new Error('Invalid HTML structure');
}
const scenes: GameScenes = {
    LOADING: audio => new LoadingScene(audio),
    INITIAL: audio => new TetrisScene(audio),
    TETRIS: audio => new TetrisScene(audio)
};
const gui = initGameGUI(guiRoot);
const game = new Game(canvas, gui, scenes);

game.start();
