import GAudioTrack from 'engine/audio/track';

export interface TrackSource {
    readonly id: string;
    readonly buffer: AudioBuffer;
}

interface Tracks {
    [id: string]: GAudioTrack;
}

class GAudio {
    public readonly tracks: Tracks = {};

    private readonly ctx: AudioContext;
    private readonly output: AudioNode;
    private readonly masterGain: GainNode;

    constructor() {
        const ctx = new AudioContext();
        const master = ctx.createGain();
        const compressor = ctx.createDynamicsCompressor();
        compressor.connect(master);
        master.connect(ctx.destination);

        this.ctx = ctx;
        this.masterGain = master;
        this.output = compressor;
    }

    public getContext(): AudioContext {
        return this.ctx;
    }

    public load(src: TrackSource[]): void {
        const { ctx, output } = this;

        for (const { id, buffer } of src) {
            const track = new GAudioTrack(buffer, ctx, output);
            this.tracks[id] = track;
        }
    }

    // set master volume (0.0 - 1.0)
    public setMasterVolume(volume: number): void {
        this.masterGain.gain.value = volume;
    }
}

export default GAudio;
