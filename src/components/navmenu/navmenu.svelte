<script>
    import { onMount } from 'svelte';
    import IndexHandler from '../../index.handler';
    import RouterLink from './routerlink.svelte';

    export let currentPath = '';

    onMount(() => {
				IndexHandler.notify = routeData => {                
            const path = routeData ? routeData.pathname : '';
            currentPath = '/' + path;
            console.log('NavMenu : routeData', routeData, path);
        };
    });
</script>

<nav class="navbar navbar-default">
	<div class="container-fluid">
		<div class="navbar-header">
			<ul class="nav navbar-nav">
				<RouterLink to="/" location={currentPath} li>
					<span class="glyphicon glyphicon-home"></span> Home
				</RouterLink>
				<RouterLink to="/employee" location={currentPath} li>
					<span class="glyphicon glyphicon-th-list"></span> Employees
				</RouterLink> 
				<RouterLink to="/department" location={currentPath} li>
					<span class="glyphicon glyphicon-th-list"></span> Departments
				</RouterLink>
				<!-- <RouterLink to="/formgrid" location={currentPath} li>
					<span class="glyphicon glyphicon-folder-open"></span> Form Grid
				</RouterLink>				 -->
				<RouterLink to="/about" location={currentPath} li>
					<span class="glyphicon glyphicon-folder-open"></span> About
				</RouterLink>
			</ul>
		</div>
		<div class="nav navbar-right">
			<p class="navbar-text">
				Logged in as Me
			</p>
		</div>
	</div>
</nav>
