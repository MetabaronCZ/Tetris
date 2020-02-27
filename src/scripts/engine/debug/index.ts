import { DebugState } from 'engine/ui/components/debug/reducers';

export type OnUpdate = (info: DebugState) => void;

abstract class StatCounter {
    protected readonly onUpdate: OnUpdate;

    constructor(onUpdate: OnUpdate) {
        this.onUpdate = onUpdate;
    }

    abstract updateStart(): void;
    abstract updateEnd(): void;
    abstract renderStart(): void;
    abstract renderEnd(): void;
}

export default StatCounter;
