<template>
  <div class="plus-widget-header">
    <div class="plus-widget-header__title" v-if="title">{{ title }}</div>
    <span
      class="plus-widget-header__menu-toggle-button"
      @click="toggleSettingsMenu"
    >
      <SettingsIcon v-if="!this.settingsOpen" />
      <CloseIcon v-else />
    </span>
  </div>
</template>

<script>
import SettingsIcon from "./icons/settings-gear-svgrepo-com.svg";
import CloseIcon from "./icons/close-svgrepo-com.svg";
export default {
  name: "PlusWidgetHeader",
  props: {
    settingsOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  methods: {
    toggleSettingsMenu() {
      this.$emit("update:settingsOpen", !this.settingsOpen);
    },
  },
  components: { SettingsIcon, CloseIcon },
};
</script>

<style scoped></style>
