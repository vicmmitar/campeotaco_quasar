<template>
  <div class="q-pa-md q-gutter-y-md column items-center">
    <h5>
      Fecha Limite de Inscripcion:
      <span style="color: red">{{ fecha_limite_inscripcion.slice(0,10) }}</span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Costo de Inscripción:
      <span style="color: blue">{{ costo_inscripcion }}</span> BS
    </h5>
    <q-btn-group push>
      <q-btn
        push
        label="Inscribir"
        icon="add"
        color="primary"
        @click="card = true"
      />
      <q-btn
        push
        label="Gestionar"
        icon="visibility"
        color="secondary"
        :disable="seleccionadoE == '' ? true : false"
        @click="irEquipo"
      />
      <q-btn
        push
        label="Eliminar"
        icon="delete"
        color="deep-orange"
        :disable="seleccionadoE == '' ? true : false"
        @click="eliminarSeleccion"
      />
    </q-btn-group>

    <q-dialog v-model="card" @hide="actualizar">
      <inscribir-equipo />
    </q-dialog>
  </div>
  <q-table
    title="Seleccionar"
    v-model:rows="rowsE"
    :columns="columns"
    row-key="idequipo"
    :filter="filter"
    selection="single"
    v-model:selected="seleccionadoE"
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
  <div class="q-mt-md">Selected: {{ JSON.stringify(seleccionadoE) }}</div>
</template>

<script>
import InscribirEquipo from "src/components/InscribirEquipo.vue";
import { ref } from "vue";
import axios from "axios";

const columns = [
  {
    name: "desc",
    required: true,
    label: "Equipo",
    align: "left",
    field: (row) => row.nombre,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "comunidad",
    align: "center",
    label: "Comunidad",
    field: "comunidad",
    sortable: true,
  },
  { name: "bandera", label: "Bandera", field: "bandera", sortable: true },
  { name: "fecha", label: "Fecha", field: row => row.inscrito_a.fecha},
  { name: "inscripcion", label: "Inscripcion", field: row => row.inscrito_a.inscripcion},
];

let loading = ref(false);

export default {
  components: { InscribirEquipo },
  props: {
    costo_inscripcion: String,
    fecha_limite_inscripcion: String,
  },
  setup() {
    return {
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
    rowsE: {
      get() {
        return this.$store.getters["autenticacion/getRowsE"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setRowsE", valor);
      },
    },
    seleccionadoE: {
      get() {
        return this.$store.getters["autenticacion/getSeleccionadoE"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setSeleccionadoE", valor);
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
  async mounted() {
    this.seleccionadoE = [];
    await this.$store.dispatch("autenticacion/actualizarTablaEquipos");
  },
  methods: {
    async actualizar() {
      loading = true;
      await this.$store.dispatch("autenticacion/actualizarTablaEquipos");
      loading = false;
    },
    async eliminarSeleccion() {
      let fila = JSON.parse(JSON.stringify(this.seleccionadoE));
      let id = await fila.pop().idequipo;
      //console.log(id);
      let url = this.ip + "campeonato/destroy/" + id;
      await axios({
        method: "get",
        url: url,
        /* headers: {
          Authorization: "Bearer " + this.token.access_token,
        }, */
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.actualizar();
    },
    async irEquipo() {
      let fila = JSON.parse(JSON.stringify(this.seleccionadoE));
      fila = await fila.pop();
      let nombre = fila.nombre;
      let idequipo = fila.idequipo;
      let titulo2 = nombre.replace(/\s+/g, '');
      //this.idCampGest = idcampeonato;
      this.$router.push({
        name: "equipo",
        params: { titulo2, nombre, idequipo },
      });
    },
  },
};
</script>
