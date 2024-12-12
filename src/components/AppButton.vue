<template>
  <button class="app-button" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<style scoped>
.app-button {
  background-color: #333;
  color: #fff;
  border: 2px solid #555;
  padding: 5px 10px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.app-button:hover {
  background-color: #444;
}

.app-button:active {
  background-color: #222;
}

.app-button:focus {
  outline: 2px solid #777;
}

.app-button:disabled {
  background-color: #555;
  color: #aaa;
  border-color: #666;
  cursor: not-allowed;
}
</style>
