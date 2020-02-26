type OnAnimationEnd = () => void;

class TileAnimation {
    public readonly duration: number; // animation duration [in Grid steps]
    public readonly rows: number[]; // tile row indexes to be animated
    private readonly onEnd: OnAnimationEnd;

    private frame = 0;
    private progress = 0;

    constructor(duration: number, rows: number[], onEnd: OnAnimationEnd) {
        this.duration = duration;
        this.rows = rows;
        this.onEnd = onEnd;
    }

    public getProgress(): number {
        return this.progress;
    }

    public step(): void {
        this.frame++;
        this.frame = Math.min(this.frame, this.duration);
        this.progress = this.frame / this.duration;

        if (1 === this.progress) {
            this.onEnd();
        }
    }
}

export default TileAnimation;
