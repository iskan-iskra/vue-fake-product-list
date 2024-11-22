<template>
  <Teleport to="body">
    <div class="app-loader-wrapper">
      <div class="app-loader"></div>
    </div>
  </Teleport>
</template>
<style scoped>
.app-loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.app-loader-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(2px);
  z-index: -1;
}
.app-loader {
  width: 50px;
  aspect-ratio: 1;
  color: #000;
  border: 2px solid;
  display: grid;
  box-sizing: border-box;
  animation: l1 4s infinite linear;
}
.app-loader::before,
.app-loader::after {
  content: "";
  grid-area: 1/1;
  margin: auto;
  width: 70.7%;
  aspect-ratio: 1;
  border: 2px solid;
  box-sizing: content-box;
  animation: inherit;
}
.app-loader::after {
  width: 50%;
  aspect-ratio: 1;
  border: 2px solid;
  animation-duration: 2s;
}
@keyframes l1 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
