import roadtrip from 'roadtrip';

roadtrip.Routing ={}

export default class IndexHandler {
    component

    constructor(private ctor, private target, private path?: string) {
        this.beforeenter = this.beforeenter.bind(this);
    }

    protected async beforeenter(current, previous) {
        if (this.ctor) {
            this.component = new this.ctor({
                target: this.target,
            });
        } else {
            current.data = await import(`./components/${current.pathname}/${current.pathname}.html`);          
        }
    }

    get route() {
        return {
            beforeenter: this.beforeenter,
            enter: (current, previous) => {
                if (current.data) {
                    this.component = new current.data.default({
                        target: this.target,
                    });                     
                    console.log('Async Entered!', current);
                    roadtrip.Routing.notify(current);
                } else {
                    console.log('Entered!', current);
                    roadtrip.Routing.notify(current);
                }
            },
            leave: (current, previous) => {
                current.data = null;
                this.component.destroy();
                console.log('Left!', current);     
            }
        }
    }
}