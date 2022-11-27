<template>
  <div class="q-pa-md q-gutter-y-md column items-center">
    <q-btn-group push>
      <q-btn
        push
        label="Consultar"
        icon="cloud_download"
        color="primary"
        @click="actualizar"
      />
      <q-btn
        push
        label="Crear"
        icon="add"
        color="primary"
        @click="card = true"
      />
      <q-btn
        push
        label="Gestionar"
        icon="visibility"
        color="secondary"
        :disable="seleccionado == '' ? true : false"
      />
      <q-btn
        push
        label="Eliminar"
        icon="delete"
        color="deep-orange"
        :disable="seleccionado == '' ? true : false"
        @click="eliminarSeleccion"
      />
    </q-btn-group>

    <q-dialog v-model="card" @hide="actualizar">
      <crear-campeonato />
    </q-dialog>
  </div>
  <q-table
    title="Seleccionar"
    v-model:rows="rows"
    :columns="columns"
    row-key="idcampeonato"
    :filter="filter"
    selection="single"
    v-model:selected="seleccionado"
    :loading="loading"
    :dense="$q.screen.lt.md"
  >
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Filtrar"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
  <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";
import CrearCampeonato from "src/components/CrearCampeonato.vue";

const columns = [
  {
    name: "desc",
    required: true,
    label: "Campeonato",
    align: "left",
    field: (row) => row.nombre,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "gestion",
    align: "center",
    label: "Gestion",
    field: "gestion",
    sortable: true,
  },
  { name: "categoria", label: "Categoria", field: "categoria", sortable: true },
  { name: "sede", label: "Sede", field: "sede" },
];

let loading = ref(false);
export default {
  components: { CrearCampeonato },
  setup() {
    return {
      seleccionado: ref([]),
      filter: ref(""),
      card: ref(false),
      columns,
      loading,
    };
  },
  computed: {
    logeado: {
      get() {
        return this.$store.getters["autenticacion/getLogeado"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setLogeado", valor);
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
    ip: {
      get() {
        return this.$store.getters["autenticacion/getIp"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setIp", valor);
      },
    },
    token: {
      get() {
        return this.$store.getters["autenticacion/getToken"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setToken", valor);
      },
    },
    rows: {
      get() {
        return this.$store.getters["autenticacion/getRows"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setRows", valor);
      },
    },
  },
  created() {
    if (!this.logeado) {
      const q = useQuasar();
      q.notify({
        message: "Debe iniciar sesion para acceder a la gestion de campeonatos",
        color: "blue",
      });
      this.$router.push("/login");
    }
  },
  async mounted() {},
  methods: {
    async actualizar() {
      loading = true;
      await this.$store.dispatch("autenticacion/actualizarTabla");
      loading = false;
    },
    async eliminarSeleccion(){
      let url = this.ip + "campeonato/destroy/"+this.seleccionado.idcampeonato;
      await axios({
        method: "get",
        url: url,
        headers: {
          Authorization: "Bearer " + this.token.access_token,
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        this.actualizar();
    }
    /* async actualizarTabla() {
      loading = true;
      console.log("actualizar");
      let url = this.ip + "campeonato";
      await axios({
        method: "post",
        url: url,
        data: {
          user: this.usuarioLogeado.user,
        },
        headers: {
          Authorization: "Bearer " + this.token.access_token,
        },
      })
        .then(function (response) {
          //console.log("antes ");
          //console.log(this.rows);
          this.rows = response.data;
          //console.log("despues ");
          //console.log(this.rows);

          loading = false;
          console.log(loading);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, */
  },
};
</script>
