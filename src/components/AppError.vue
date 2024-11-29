<template>
  <div class="error-message">
    <slot></slot>
  </div>
</template>

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
