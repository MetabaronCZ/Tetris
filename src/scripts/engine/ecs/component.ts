export type ComponentMap<T extends string = never> = {
    readonly [id in T]: Component;
}

export abstract class Component {
    private enabled = true;

    public isEnabled(): boolean {
        return this.enabled;
    }

    public toggle(enable: boolean): void {
        this.enabled = enable;
    }
}
