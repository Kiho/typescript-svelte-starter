import Requests from '../utils/request';
import AppService from './appService';

export default {
    oncreate (p, o?) {
        Object.assign(this, p, o);      
    },

    getList(this: IAppPage) {
        const { path } = this.get();
        AppService.getList(path).then(data => {
            this.set({ list: data  });
        });
    },

    add(this: IAppPage, evt?) {
        evt && evt.preventDefault();
        this.set({ showModal: true, selectedItem: {} });
    },

    edit(this: IAppPage, item, evt?) {
        evt && evt.preventDefault();
        this.set({ showModal: true, selectedItem: item });
    },

    save(this: IAppPage, item, evt?) {
        evt && evt.preventDefault();
        const fnSave = (data) => {
            this.close();
            this.getList();
        }
        const { path } = this.get();
        AppService.save(path, item, this.refs.form.refs.form, fnSave);
    },
    
    close(this: IAppPage) {
        this.set({ showModal: false, selectedItem: null });
    }
}