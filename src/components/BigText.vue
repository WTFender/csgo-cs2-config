<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>{{ path }}</h3>
  </div>
</template>

<style scoped>
h1,
a {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3,
a {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
