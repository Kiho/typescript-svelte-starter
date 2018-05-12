
export let apiBaseUrl = '';
export let siteName;

const name = 'typescript-svelte-starter';
const ghUrl = `https://kiho.github.io/${name}`;

if (document.location.href.indexOf(name) > -1){
    apiBaseUrl = 'https://cryptic-dusk-82553.herokuapp.com/';
    siteName = 'typescript-svelte-starter';
}