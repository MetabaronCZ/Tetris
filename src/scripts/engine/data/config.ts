import { createColor } from 'engine/graphics/color';

// paths
export const PATH_IMAGES = 'images';
export const PATH_SOUNDS = 'sounds';

// graphics
export const RENDER_WIDTH = 640; // internal view width
export const RENDER_HEIGHT = 800; // internal view height
export const RENDER_SCALE = 1.0; // scale canvas context to canvas CSS size
export const DISTANCE_TO_PIXEL_RATIO = 32 / 1; // how many pixel makes one in-game meter

// game loop
const UPS = 100; // ideal number of updates per second
export const UPDATE_TICK = 1000 / UPS; // preffered length of one update 

// debug info
export const DEBUG_SPRITE = false;
export const DEBUG_COUNTER = false;
export const DEBUG_POINT_SIZE = 4.0;
export const DEBUG_POINT_COLOR = createColor(0, 0, 0);
export const DEBUG_AXIS_COLOR = createColor(0, 255, 255);
export const DEBUG_OUTLINE_COLOR = createColor(255, 0, 255);
