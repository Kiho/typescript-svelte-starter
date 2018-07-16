import roadtrip from 'roadtrip';
import IndexHandler from './index.handler';

import Home from './components/home/home.html';

declare var basePath;

export default class Routes {
    router;

    indexHandler;
    employeeHandler;
    departmentHandler;
    aboutHandler;

    constructor(target: Element) {
        this.router = roadtrip;
        this.init(target);
    }

    init(target) {
        this.indexHandler = new IndexHandler(Home, target);
        this.aboutHandler = new IndexHandler(null, target, 'about');
        this.employeeHandler = new IndexHandler(null, target);
        this.departmentHandler = new IndexHandler(null, target);

        this.router
            .add(basePath + '/', this.indexHandler.route)
            .add(basePath + '/about', this.aboutHandler.route)
            .add(basePath + '/employee', this.employeeHandler.route)
            .add(basePath + '/department', this.departmentHandler.route)
            .start({
                fallback: basePath + '/'
            });
    }
}

export { basePath };