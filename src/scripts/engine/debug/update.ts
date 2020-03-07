import StatCounter, { OnUpdate } from 'engine/debug';

const COUNTER_INTERVAL = 1000; // UPS / FPS counter update interval [in ms]

interface DebugInfo {
    ups: {
        start: number;
        count: number;
        duration: number;
    };
    fps: {
        start: number;
        count: number;
        duration: number;
    };
}

const getData = (): DebugInfo => ({
    ups: {
        start: 0,
        count: 0,
        duration: 0
    },
    fps: {
        start: 0,
        count: 0,
        duration: 0
    }
});

class UpdateCounter extends StatCounter {
    private data = getData();

    constructor(onUpdate: OnUpdate) {
        super(onUpdate);
        this.loop();
    }

    public updateStart(): void {
        this.data.ups.start = performance.now();
    }

    public updateEnd(): void {
        const { ups } = this.data;
        ups.count++;
        ups.duration += performance.now() - ups.start;
    }

    public renderStart(): void {
        this.data.fps.start = performance.now();
    }

    public renderEnd(): void {
        const { fps } = this.data;
        fps.count++;
        fps.duration += performance.now() - fps.start;
    }

    private loop(): void {
        setInterval(() => {
            const { ups, fps } = this.data;

            this.onUpdate({
                ups: {
                    value: ups.count,
                    avg: ups.duration / ups.count
                },
                fps: {
                    value: fps.count,
                    avg: fps.duration / fps.count
                }
            });

            this.data = getData();

        }, COUNTER_INTERVAL);
    }
}

export default UpdateCounter;
