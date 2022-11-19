<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row justify-center">
        <div class="col-lg-2 col-md-4 col-sm-6 col-xs-10 mx-auto">
          <q-slide-transition>
          <ingresar v-if="!registerActive" />
          <registro v-else />
          </q-slide-transition>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'

import ingresar from '../components/Ingresar.vue'
import registro from '../components/Registro.vue';
export default {
  name: "PageLogin",
  components: { ingresar, registro, },
  computed: {
    logeado: {
      get() {
        return this.$store.getters["autenticacion/getLogeado"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setLogeado", valor);
      },
    },
    registerActive: {
      get() {
        return this.$store.getters["autenticacion/getRegisterActive"];
      },
      set(valor){
        return this.$store.dispatch("autenticacion/setRegisterActive", valor);
      }
    },
  },
  created() {
    if(this.logeado){
      const $q = useQuasar();
      $q.notify({
          message: 'Usted ya inicio sesion',
          color: 'blue',
        })
      this.$router.push('/');
    }
  }

};
</script>



