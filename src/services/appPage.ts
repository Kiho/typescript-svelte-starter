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
        if (!validateForm(this.refs.form.refs.form)){
            return;
        }
        const fnSave = (data) => {
            this.close();
            this.getList();
        }
        const { path } = this.get();
        AppService.save(path, item, fnSave);
    },
    
    close(this: IAppPage) {
        this.set({ showModal: false, selectedItem: null });
    },
}

function validateForm(form) {
    // check validity of all inputs
    const isValid = form.checkValidity();
    if (!isValid) {
        for (let i = 0; i < form.length; i++) {
            const input = form[i];
            if (input.checkValidity) {
                if (!input.checkValidity()) {
                    console.log(input.validationMessage);                        
                }
                if (input.setError) {
                    input.setError(input.validationMessage);
                }
            }
        }
    }
    return isValid;
}