import Requests from '../utils/request';

export default class AppService {

    static async getList(path: string): Promise<{}> {
        return Requests.get(`api/${path}`);
    }

    static async save(path: string, item, fnSave): Promise<{}> {
        if (item.id) {
            return Requests.put(`api/${path}`, item).then(fnSave);
        } else {
            return Requests.post(`api/${path}`, item).then(fnSave);
        }        
    }
}