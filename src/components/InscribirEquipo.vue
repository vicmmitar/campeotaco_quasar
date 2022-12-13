<template>
  <q-card class="my-card">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="nombre"
        label="Nombre *"
        hint="Identifique a su equipo"
      />

      <q-input
        filled
        v-model="comunidad"
        label="Comunidad"
        hint="Comunidad a la que pertenece"
      />

      <q-input
        filled
        v-model="bandera"
        label="Bandera"
        hint="Colores del equipo"
      />

      <q-input
        type="number"
        filled
        v-model="inscripcion"
        label="Inscripcion"
        hint="Bs cancelados"
      />

      <q-separator />

      <q-card-actions align="around">
        <q-btn label="Crear" type="submit" color="primary" />
        <q-btn
          label="Reiniciar"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { useQuasar, Notify } from "quasar";
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const q = useQuasar();

    const nombre = ref(null);
    const comunidad = ref(null);
    const bandera = ref(null);
    const inscripcion = ref(null);

    return {
      nombre,
      comunidad,
      bandera,
      inscripcion,
      q,
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
    usuarioLogeado: {
      get() {
        return this.$store.getters["autenticacion/getUsuarioLogeado"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setUsuarioLogeado", valor);
      },
    },
    idCampGest: {
      get() {
        return this.$store.getters["autenticacion/getIdCampGest"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setIdCampGest", valor);
      },
    },
  },
  methods: {
    async onSubmit() {
      if (this.nombre == null) {
        this.q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Debe ingresar al menos el nombre del campeonato",
        });
      } else {
        let url = this.ip + "equipo/store";
        let data = {
          nombre: this.nombre,
          comunidad: this.comunidad,
          bandera: this.bandera,
          inscripcion: this.inscripcion,
          idcampeonato: this.idCampGest,
        };
        await axios({
          method: "post",
          url: url,
          data: data,
          /* headers: {
            Authorization: "Bearer " + this.token.access_token,
          }, */
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
      this.comunidad = null;
      this.bandera = null;
      this.inscripcion = null;
    },
  },
};
</script>
