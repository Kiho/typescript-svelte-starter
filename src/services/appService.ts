import Requests from '../utils/request';
const apiBaseUrl = 'https://cryptic-dusk-82553.herokuapp.com/';

export default class AppService {

    static async getList(path: string): Promise<{}> {
        return Requests.get(`${apiBaseUrl}api/${path}`);
    }

    static async save(path: string, item, fnSave): Promise<{}> {
        if (item.id) {
            return Requests.put(`${apiBaseUrl}api/${path}`, item).then(fnSave);
        } else {
            return Requests.post(`${apiBaseUrl}api/${path}`, item).then(fnSave);
        }        
    }
}