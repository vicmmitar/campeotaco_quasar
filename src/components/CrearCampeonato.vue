<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="nombre"
        label="Nombre *"
        hint="Identifique a su campeonato"
      />

      <q-input
        filled
        type="number"
        v-model="gestion"
        label="Gestion"
        hint="Año en que se desarrolla"
      />

      <q-select
        filled
        v-model="categoria"
        :options="options"
        label="Categoria"
      />

      <q-input filled v-model="sede" label="Sede" hint="Sede del campeonato" />

      <div>
        <q-btn label="Crear" type="submit" color="primary" />
        <q-btn
          label="Reiniciar"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar, Notify } from "quasar";
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const $q = useQuasar();

    const nombre = ref(null);
    const gestion = ref(null);
    const sede = ref(null);
    const categoria = ref(null);

    return {
      nombre,
      gestion,
      categoria,
      sede,
      $q,
      options: ["Damas", "Varones", "Senior", "Niños"],
    };
  },
  computed: {
    token: {
      get() {
        return this.$store.getters["autenticacion/getToken"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setToken", valor);
      },
    },
    ip: {
      get() {
        return this.$store.getters["autenticacion/getIp"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setIp", valor);
      },
    },
  },
  methods: {
    async onSubmit() {
      if (this.nombre == null) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Debe ingresar al menos el nombre del campeonato",
        });
      } else {
        let url = this.ip + "campeonato/store";
        let data = {
          nombre: this.nombre,
          gestion: this.gestion,
          categoria: this.categoria,
          sede: this.sede,
        };
        await axios({
          method: "post",
          url: url,
          data: data,
          headers: {
            Authorization: "Bearer " + this.token.access_token,
          },
        })
          .then(async function (response) {
            //console.log(response);
            Notify.create({
              message: response.data.mensaje,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    onReset() {
      this.nombre = null;
      this.gestion = null;
      this.categoria = null;
      this.sede = null;
    },
  },
};
</script>
