<template>
<body>
    <div id="app">
        <MainTable></MainTable>
    </div>
</body>
</template>

<script>
    import MainTable from './components/Table.vue'
    export default {
      components: {MainTable},
      mounted: function () {
      }
    }
</script>

<style>
@import './components/default.css';
</style>