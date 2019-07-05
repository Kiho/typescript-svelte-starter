<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let className = '';
    export let label = '';
    export let value = false;
</script>

<button class="btn btn-{className}" on:click="{event => dispatch('click', event)}">{label}</button>