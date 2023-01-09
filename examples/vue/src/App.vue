<script setup lang="ts">
function toggleTheme() {
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <div class="container">
    <img src="./assets/test.svg" alt="">
  </div>
  <div class="action-bar">
    <button @click="toggleTheme">
      click to change theme
    </button>
  </div>
</template>

<style>
.container{
  margin: auto;
  width: 70%;
  height: 70%;
}
.action-bar{
  margin-top: 10px;
  text-align: center;
}
button{
  font-size: 18px;
}
</style>
