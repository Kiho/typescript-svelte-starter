<script>
    import { afterUpdate, createEventDispatcher } from 'svelte';
    import { basePath } from '../../routes';    
    import roadtrip from 'roadtrip';

    const dispatch = createEventDispatcher();
    const activedClassName = 'active'
    
    export let li;
    export let className = '';
    export let active = '';
    export let to = '/';
    export let location = '';
    export let item = null;

    afterUpdate(() => {
        setActivedClass(location);
    });

    function navigate($e, to) {
        if ($e && $e.preventDefault) $e.preventDefault()
        // console.log('roadtrip.RouteData', roadtrip.RouteData);
        if (item) {
            dispatch('itemClick', event, item);
        } else if (to) {            
            roadtrip.goto(basePath + to);
        }
    }

    function setActivedClass(location) {
        if (location === `${basePath}${to}`) {
            active = activedClassName;
        } else {
            active = '';
        }
    }
</script>

{#if li}
<li class="{ className + ' ' + active }">
    <a href='{basePath}{ to }' on:click='{event => navigate(event, to)}'>
        <slot></slot>
    </a>
</li>
{:else}
<a href='{basePath}{ to }' class="{ className + ' ' + active }" on:click='{event => navigate(event, to)}'>
    <slot></slot>
</a>
{/if}