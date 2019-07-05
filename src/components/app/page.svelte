<script>
    import { afterUpdate, onMount } from 'svelte';
    import { DataGrid, FormGrid } from '../../formgrid';
    import Modal from '../app/modal.svelte';
    import appPage from '../../services/appPage';

    export let title = '';
    export let columndata = [];
    export let partial = null;
    export let instance = null;
    export let list = [];
    export let showModal = false;
    export let selectedItem = null;
    export let path = '';
    export let fielddata = [];
    export let form = null;

    let initialized = false;
    const app = Object.assign({}, appPage);

    $: {
        if (path && instance) {            
            if (!initialized) initialized = true;
        }
    }

    $: if (initialized) {
        partial.oncreate(instance).then(getList);
    }

    export function close() {
        app.close.call(instance);
    }

    function add(e) {
        app.add.call(instance, e);
    }

    function save(item, e) {
        app.save.call(instance, item, e);
    }

    export function edit(item, e) {
        app.edit.call(instance, item, e);
    }

    export function getList() {
        app.getList.call(instance);
    }

    // const app = Object.assign({}, appPage);
    // const { getList, add, edit, save, close } = app;

    // export default {
    //     components: {
    //         Modal,
    //         FormGrid, 
    //         DataGrid
    //     },
    //     oncreate () {
    //         const { partial } = this.options;
    //         const p = app.oncreate(this, partial);
    //         partial.oncreate(p);          
    //     },
    //     methods: {
    //         getList,
    //         add,
    //         edit,
    //         save,
    //         close
    //     }
    // }    
</script>

<svelte:options accessors={true}/>
<div class="container">
    <h1>{title}</h1>
    <div class="row">
        <div class="col-md-12">
            <DataGrid bind:rows="{list}" bind:columns="{columndata}" edit={false} ></DataGrid>
            <button type="button" class="btn btn-primary" on:click='{add}'>Add New</button>
        </div>
    </div>
    <div>
        {#if showModal}
            <Modal on:close="{close}" on:save="{(e) => save(selectedItem, e)}" title={selectedItem.name}>
                <div class=form-group bind:this="{form}">
                    <FormGrid columns={fielddata} bind:item="{selectedItem}" ></FormGrid> 
                </div>                     
            </Modal>
        {/if}
    </div>
</div>