import Game from 'engine/game';

import scenes from 'game/data/scenes';
import { initGameGUI } from 'game/ui/index';

const canvas = document.querySelector<HTMLCanvasElement>('.Canvas');
const guiRoot = document.querySelector<HTMLDivElement>('.GUI');

if (!canvas || !guiRoot) {
    throw new Error('Invalid HTML structure');
}
const gui = initGameGUI(guiRoot);
const game = new Game(canvas, gui, scenes);

game.start();
