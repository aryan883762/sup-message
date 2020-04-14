<template>
  <div class="container">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Guest"
};
</script>

<style scoped>
</style>