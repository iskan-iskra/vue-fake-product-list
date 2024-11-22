<template>
  <div class="error-message" v-if="message">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
interface IErrorMessageProps {
  message: string | null;
}

const { message = null } = defineProps<IErrorMessageProps>();
</script>

<style scoped>
.error-message {
  color: #d32f2f;
  background-color: #fdecea;
  padding: 10px;
  border: 1px solid #f44336;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
}
</style>
