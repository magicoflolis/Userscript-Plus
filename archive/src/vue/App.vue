<template>
    <div id="app">
      <MainTable></MainTable>
    </div>
</template>

<script>
import MainTable from "./components/Table.vue";
export default {
  name: "App",
  components: { MainTable },
  mounted: function() {},
};
</script>

<style>
@import "../../tests/compiled/magicuserjs.css";
</style>
