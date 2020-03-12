export interface DebugState {
    readonly ups: {
        readonly value: number;
        readonly avg: number;
    };
    readonly fps: {
        readonly value: number;
        readonly avg: number;
    };
}

export const getDebugState = (): DebugState => ({
    ups: {
        value: 0,
        avg: 0
    },
    fps: {
        value: 0,
        avg: 0
    }
});
