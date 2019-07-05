<script>
   import { TextField, NumberField } from './fields';

   let text = '12345';
</script>

<!-- *** completely minimise bottom-right area of REPL to see generated form ***
- FormConfig.html & FormGen.html has interesting stuff, other files are tiny
- toggle edit button in form to switch between view/edit mode 

This is a cut-down/simplified version of https://github.com/Kiho/svelte-formgrid  
svelte-formgrid also supports masking, validation, errors & more. This version supports view/edit modes, ordering, hiding + specifying component type in UI
-->
<div class="wrapper">
   <TextField label="Indivisual TextField" bind:value="{text}" placeholder="Text" />
   <NumberField label="Indivisual NumberField" bind:value="{text}" placeholder="Number" />
   <div class="formcfg">
      FormConfig
   </div>
   <div class="formgen">
      FormGen
   </div>
</div>