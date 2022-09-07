<template>
  <PlusWidget />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlusWidget from "./components/PlusWidget/PlusWidget.vue";

export default defineComponent({
  name: "App",
  components: {
    PlusWidget,
  },
});
</script>
