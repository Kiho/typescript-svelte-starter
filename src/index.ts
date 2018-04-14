// import App from './App.html';

// const app = new App({
// 	target: document.querySelector('#app'),
// });

/*
 * This is the entrypoint of all the JavaScript files.
 */

import Svelte from 'svelte';
import App from './components/app/app.html';

// declare var siteName;
var siteName;
(window as any).basePath = siteName == undefined ? '' : `/${siteName}`;

const app: Svelte = new App({
    target: document.querySelector('#app-root'),
});
