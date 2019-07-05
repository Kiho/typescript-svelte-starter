<script>
    import { onDestroy, onMount } from 'svelte';
    import MenuComponent from '../navmenu/navmenu.svelte';
    import Routes from '../../routes';
    
    export let menu;

    let router;

    onMount(() => {
        const target = document.querySelector('#app');
        router = new Routes(target);
        // console.log('router', router);
    });

    onDestroy(() => {
        // router.destroy()
    });
</script>

<div class="container-fluid">
    <div class="row">
        <MenuComponent bind:this={menu} />
    </div>    
</div>
<div class="container">
    <div class="row" id="app"></div>
</div>
