<template>
  <div id="app">
    <my-header></my-header>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import MyHeader from "@/components/Header.vue"
export default {
  name: 'app',
  components: {
    MyHeader
  }
}
</script>

<style>
#app {

}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-out;

}

.fade-enter, .fade-leave-to {
  opacity: 0;

}
</style>
