import roadtrip from 'roadtrip';
import { allWithMapAsync } from "./utils/async";

export default class IndexHandler {
    static notify: (data: string) => void;

    component

    constructor(private ctor, private target, private path?: string) {
        this.beforeenter = this.beforeenter.bind(this);
    }

    protected async importModules(pathname) {
        const modules: any = {
            template: await import(`./components/app/page.svelte`),
            data: await import(`./components/${pathname}/${pathname}`),
        }
        return allWithMapAsync(modules);
    }

    protected async beforeenter(current, previous) {
        if (this.ctor) {
            this.component = new this.ctor({
                target: this.target,
            });
        } else {
            if (this.path) {
                current.data = { template: await import(`./components/${this.path}/${this.path}.svelte`) }; 
            } else {
                current.data = await this.importModules(current.pathname);
            }                     
        }
    }

    get route() {
        return {
            beforeenter: this.beforeenter,
            enter: (current, previous) => {
                if (current.data) {
                    const options: any = { target: this.target };
                    let props;
                    if (current.data.data) {
                        props = Object.assign({}, current.data.data.initialData, { 
                            partial: current.data.data[current.pathname],
                            instance: null,                          
                        });
                        options.props = props;
                    }
                    this.component = new current.data.template.default(options);
                    if (props) {
                        this.component.$set({ instance: this.component });
                    }
                    console.log('Async Entered!', current);                    
                    IndexHandler.notify(current);
                } else {
                    console.log('Entered!', current);
                    IndexHandler.notify(current);
                }
            },
            leave: (current, previous) => {
                current.data = null;
                this.component.$destroy();
                console.log('Left!', current);     
            }
        }
    }
}