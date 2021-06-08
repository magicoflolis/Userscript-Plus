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
body {
  color: #ffffff!important;
  background-color: #2e323d !important;
  width: 800px !important;
  height: 550px;
  top:0px;
  left:0px;
}
#app {
  position: fixed;
  width: 100%;
}
</style>
