<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
    <div v-for="n in 6" :key="n" class="col">
      <v-skeleton-loader class="w-100" type="card, article, button" elevation="2" />
    </div>
  </div>
</template>
