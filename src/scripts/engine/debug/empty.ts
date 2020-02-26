import StatCounter from 'engine/debug';

const onUpdate = (): void => void(0);

class EmptyCounter extends StatCounter {
    constructor() {
        super(onUpdate);
    }

    public updateStart(): void {
        // do nothing
    }

    public updateEnd(): void {
        // do nothing
    }

    public renderStart(): void {
        // do nothing
    }

    public renderEnd(): void {
        // do nothing
    }
}

export default EmptyCounter;
