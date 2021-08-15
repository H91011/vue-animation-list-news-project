<template lang="html">
  <div class="component-wrapper">
    <p>List</p>
    <ul ref="list">
      <ListItem
        v-for="item in getFilteredData()"
        :key="item.url"
        :title="item.title"
        :url="item.url"
        :count="item.count"
        :index="item.index"
        :animUp="item.animationUp"
        :animDown="item.animationDown"
        :swaped="item.swaped"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ListItem from "./listItem.vue";

export default {
  components: {
    ListItem
  },
  computed: { ...mapGetters(["getFilteredData"]) },
  mounted() {
    console.log("New component mounted.");
  }
};
</script>

<style lang="css" scoped>
ul {
  list-style: none;
  border-style: dashed;
  width: 60%;
}
</style>
