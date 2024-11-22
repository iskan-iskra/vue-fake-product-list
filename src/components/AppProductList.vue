<template>
  <div class="app-product-list-wrapper">
    <div v-if="$slots.title" class="app-title-wrapper">
      <slot name="title"></slot>
    </div>
    <div v-if="$slots.list" class="app-product-list" :class="[mode]">
      <slot name="list"></slot>
    </div>
    <div v-if="$slots['list-actions']" class="app-actions-wrapper">
      <slot name="list-actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IAppProductListProps {
  mode?: "horizontal" | "vertical";
}
const { mode = "horizontal" } = defineProps<IAppProductListProps>();
</script>

<style scoped>
.app-product-list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
  border: 1px solid black;
}
.app-product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.app-product-list.horizontal {
  flex-direction: row;
}
.app-product-list.vertical {
  flex-direction: column;
}
.app-actions-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  align-items: end;
}
</style>
