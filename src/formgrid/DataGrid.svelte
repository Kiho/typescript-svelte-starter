<script>
    import { afterUpdate, createEventDispatcher } from 'svelte';
    import DataCol from './DataCol.svelte';

    const dispatch = createEventDispatcher();

    export let edit = true;
    export let columns = [];
    export let rows = [];
    export let selected = null;

    function setRowCol(settings, i, j) {
        settings.dataset = { row: i, col: j };
        return settings;
    }

    let prevSelected;
    afterUpdate(() => {
        if (prevSelected && selected) {
            let s = prevSelected;
            const el = table.querySelector( 
                `[data-row="${s[0]}"][data-col="${s[1]}"]` 
            );
            // console.log(s, el);
            if (el) el.focus();
        }
    });

    function actionClick(event, row, action) {
        event && event.preventDefault();
        action && action(row);
    }

    function arrow(e) {
        const { target: node, keyCode: code} = e;
        if (code < 37 || code > 40) return;

        let i = +node.dataset.row;
        let j = +node.dataset.col;

        if (code === 37) j = Math.max(0, j - 1);
        if (code === 39) j = Math.min(j + 1, columns.length - 1);
        if (code === 38) i = Math.max(0, i - 1);
        if (code === 40) i = Math.min(i + 1, rows.length - 1);
        
        selected = [ i, j ];
    }
</script>

<div style="position: relative">
    <table class="table table-striped table-sm {edit ? 'table-bordered' : ''}">
        <thead>
            <tr>
                {#each columns as column, x}
                <th style="width: { column.width ? column.width : 'auto' }">
                    {column.label}
                </th>
                {/each}
            </tr>
        </thead>

        <tbody>
        {#each rows as row, i}
            <tr>
                {#each columns as column, j}
                    <td class="{ ((!edit && column.action) || edit) ? 'nopadding' : '' } { column.numeric ? 'numeric' : ''} { column.truncate ? ' truncate' : '' }" 
							style="width: { column.width ? column.width : 'auto' }">
                        <DataCol bind:source="{row}" {edit} 
                            settings="{setRowCol(column, i, j)}"
                            on:change="{event => dispatch('update', { event })}" 
                            on:click="{event => actionClick(event, row, column.action)}"
                            on:keydown="{arrow}"
				            on:focus="{() => selected = [i, j]}"
                        />
                    </td>    
                {/each}
            </tr>
        {/each}
        </tbody>
    </table>    
</div>
    


<style>
    td.nopadding {
		padding: 0 0;
	}
	td.nopadding :global(input) {
		padding: 0.35rem 0.5rem;
		border-width: 0;
		/* background-color: transparent; */
	}
</style>