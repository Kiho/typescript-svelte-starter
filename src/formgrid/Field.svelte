<script>    
    import { makeUniqueId } from '../utils';
    import { afterUpdate, onMount } from 'svelte';
    import { omitProps } from '../utils';

    export let submit = false;
    export let error = '';
    export let settings = null;
    export let uuid = makeUniqueId();
    export let fieldtype = null;
    export let value = '';
    export let withSettings = false;
    export let type = 'text';
    export let placeholder = '';
    export let inputClass = '';
    export let text = '';
    export let className = '';
    export let readOnly = false;
    export let required = false;
    export let pattern = '';
    export let validate = null;
    export let uniqueId = false;

    let props = $$props;
    $: { 
        props = withSettings ? omitProps(settings, 'settings', 'withSettings', 'fieldtype') : props;
        console.log('Field', props);
    }
    onMount(() => {
        
    });

    export let message;
    $: {
        message = submit ? error : '';
    }

    export let label;
    $: { 
        label = settings ? settings.label : null;
    }
</script>

<div class="form-group row">
    <label class="col-4 col-form-label" for={uuid}>{label}</label>
    <div class="col-8">
        <div class="form-group">
            <svelte:component this="{fieldtype}" {...props} bind:value bind:submit bind:error {uuid} />
            {#if submit && error}
            <div class="invalid-feedback">
                {message}
            </div>
            {/if}
        </div>       
    </div>
</div>

<style>
    .invalid-feedback {
        display: block;
        color: red;
    }
</style>