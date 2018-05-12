/*
 * This is the entrypoint of all the JavaScript files.
 */

import Svelte from 'svelte';
import { siteName } from './config';
import App from './components/app/app.html';

// declare var siteName;
(window as any).basePath = siteName == undefined ? '' : `/${siteName}`;

const app: Svelte = new App({
    target: document.querySelector('#app-root'),
});
