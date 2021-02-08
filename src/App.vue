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
@import './common/css/default.css';
    /* @import './common/css/dark.css'; */
</style>