import roadtrip from 'roadtrip';
import { allWithMapAsync } from "./utils/async";

roadtrip.Routing ={}

export default class IndexHandler {
    component

    constructor(private ctor, private target, private path?: string) {
        this.beforeenter = this.beforeenter.bind(this);
    }

    protected async importModules(pathname) {
        const modules: any = {
            template: await import(`./components/app/page.html`),
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
            if (current.pathname === 'about') {
                current.data = { template: await import(`./components/${current.pathname}/${current.pathname}.html`) }; 
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
                    if (current.data.data) {
                        Object.assign(                            
                            options, 
                            { initialData: current.data.data.initialData},
                            { partial: current.data.data[current.pathname] });
                    }
                    this.component = new current.data.template.default(options); 
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