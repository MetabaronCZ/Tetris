class GAudioTrack {
    private readonly ctx: AudioContext;
    private readonly buffer: AudioBuffer;
    private readonly output: AudioNode;

    constructor(buffer: AudioBuffer, ctx: AudioContext, output: AudioNode) {
        this.ctx = ctx;
        this.buffer = buffer;
        this.output = output;
    }

    public play(): void {
        const { ctx, buffer, output } = this;
        const source = ctx.createBufferSource();
        const gain = ctx.createGain();

        source.buffer = buffer;
        source.connect(gain);
        gain.connect(output);

        source.start(0);
    }
}

export default GAudioTrack;
