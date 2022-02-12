<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css">
  <header>
    <h1>Example of Nuxt v3 + Deno Deploy!</h1>
    <nav>
      <a href="https://github.com/uki00a/nuxt3-deno-deploy-example" target="_blank">Source</a>
    </nav>
  </header>
  <main class="h-100vh">
    <div>Counter: {{ counter }}</div>
    <button @click="++counter">+</button>
    <button @click="--counter">-</button>
  </main>
</template>

<style scoped>
.h-100vh {
  height: 100vh;
}
</style>

<script setup>
const counter = useState('counter', () => 0)
</script>