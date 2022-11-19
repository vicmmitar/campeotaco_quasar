<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
    <crear-campeonato />
  </q-page>
</template>

<script>
import CrearCampeonato from 'src/components/CrearCampeonato.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { CrearCampeonato },
  name: 'PageIndex'
})
</script>
