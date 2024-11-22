<template>
  <div class="app-product-card">
    <div>{{ product.name }}</div>
    <div v-if="$slots.actions" class="app-actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TiProduct } from "@types";

interface IAppProductCardProps {
  product: TiProduct;
}

const { product } = defineProps<IAppProductCardProps>();
</script>

<style scoped>
.app-product-card {
  width: fit-content;
  padding: 10px;
  border: 1px solid black;
}
.app-actions-wrapper {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: end;
}
</style>
