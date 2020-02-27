import Game from 'engine/game';
import { initGUI } from 'engine/ui';

import { gameGUI } from 'game/ui';
import TetrisScene from 'game/scenes/tetris';
import LoadingScene from 'game/scenes/loading';

const canvas = document.querySelector<HTMLCanvasElement>('.Canvas');
const guiRoot = document.querySelector<HTMLDivElement>('.GUI');

if (!canvas || !guiRoot) {
    throw new Error('Invalid HTML structure');
}
const gui = initGUI(guiRoot, gameGUI);
const game = new Game(canvas, gui, new LoadingScene(), new TetrisScene());

game.start();
