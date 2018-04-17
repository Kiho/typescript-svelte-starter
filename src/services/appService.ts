import Requests from '../utils/request';

export default class AppService {

    static async getList(path: string) {
        return Requests.get(`api/${path}`);
    }

    static async save(evt, path: string, item, fnSave) {
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        }
        console.log('save', item);
        Requests.put(`api/${path}`, item).then(fnSave);
    }

    static validateForm(form) {
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
}