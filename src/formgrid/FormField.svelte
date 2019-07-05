<script>
    import { onMount } from 'svelte';
    import {
        TextInput,
        SelectInput,
        NumberInput,
        CurrencyInput,
        MaskedInput,
    } from './inputs';
    import Field from './Field.svelte';
    import { makeUniqueId } from '../utils';

    export let settings = null;
    export let value = '';
    export let uuid = makeUniqueId();

    let props = $$props;

    onMount(() => {
        console.log('FormField', props);
    });

    export let fieldlabel;
    $: {
        fieldlabel = settings ? settings.label : '';
    }

    export let fieldtype;
    $: {
        let ft = TextInput;
        if (settings.component) {
            switch (settings.component.toLowerCase()) {
                case 'currency':
                    ft = CurrencyInput;
                    break;
                case 'masked':
                    ft = MaskedInput;
                    break;
                case 'number':
                    ft = NumberInput;
                    break;
                case 'select':
                    ft = SelectInput;
                    break;
            }
        }
        fieldtype = ft;
    }
</script>

<Field {settings} withSettings={true} {fieldtype} bind:value />