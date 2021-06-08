<template>
  <div id="app">
    <MainTable></MainTable>
  </div>
</template>

<script>
import MainTable from "./components/Table.vue";
export default {
  components: { MainTable },
  mounted: function() {},
};
</script>

<style>
#app {
  color: #ffffff !important;
  background-color: #2e323d !important;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
}
</style>
