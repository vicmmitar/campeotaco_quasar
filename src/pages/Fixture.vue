<template>
  <div class="row justify-between items-center content-center">
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-6 q-pa-sm">
      <q-table
        :table-style="'counter-reset: cssRowCounter ' + ';'"
        bordered
        title="Partidos Jugados"
        dense
        :rows="list1"
        :columns="columns"
        row-key="name"
        v-model:pagination="pagination"
        hide-pagination
      >
        <template v-slot:body-cell-row-number>
          <q-td><span class="rowNumber" /> </q-td>
        </template>
      </q-table>
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          size="sm"
        />
      </div>
      <!-- <q-card class="my-card">
        <q-card-section> LISTA: {{ JSON.stringify(list1) }} </q-card-section>
      </q-card> -->
      <!-- <div class="col-6">LISTA: {{ JSON.stringify(list1) }}</div> -->
    </div>

    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-6 q-pa-sm">
      <q-table
        :table-style="'counter-reset: cssRowCounter ' + ';'"
        bordered
        title="Rol de partidos"
        dense
        :rows="list2"
        :columns="columns"
        row-key="name"
        v-model:pagination="pagination1"
        hide-pagination
      >
        <template v-slot:body-cell-row-number>
          <q-td><span class="rowNumber" /> </q-td>
        </template>
      </q-table>
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination1.page"
          color="grey-8"
          :max="pagesNumber1"
          size="sm"
        />
      </div>
      <!-- <q-card class="my-card">
        <q-card-section> LISTA: {{ JSON.stringify(list2) }} </q-card-section>
      </q-card> -->
      <!-- <div class="col-6">LISTA: {{ JSON.stringify(list1) }}</div> -->
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 3,
      //rowsNumber: 10
    });
    const pagination1 = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 3,
      //rowsNumber: 10
    });

    return {
      columns,
      drag: false,
      pagination,
      pagination1,
      pagesNumber: 3,
      pagesNumber1: 3,
      //pagesNumber: computed(() => Math.ceil(list.length / pagination.value.rowsPerPage)),
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
    idCampGest: {
      get() {
        return this.$store.getters["autenticacion/getIdCampGest"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setIdCampGest", valor);
      },
    },
    list1: {
      get() {
        return this.$store.getters["autenticacion/getList"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setList", valor);
      },
    },
    list2: {
      get() {
        return this.$store.getters["autenticacion/getList1"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setList1", valor);
      },
    },
    equipos: {
      get() {
        return this.$store.getters["autenticacion/getRows"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setRows", valor);
      },
    },
  },
  async created() {
    await this.$store.dispatch("autenticacion/actualizarTablaFixture");
    await this.$store.dispatch("autenticacion/actualizarTablaJugados");
  },
};

const columns = [
  {
    name: "row-number",
    required: true,
    label: "#",
    align: "left",
    sortable: false,
  },
  {
    name: "Equipo1",
    required: true,
    label: "Equipo",
    align: "left",
    field: (row) => row.equipo.nombre,
    format: (val) => `${val}`,
  },
  {
    name: "Versus",
    required: false,
    label: "vs.",
    align: "left",
    field: (row) => "vs.",
    format: (val) => `${val}`,
  },
  {
    name: "Equipo2",
    required: true,
    label: "Equipo",
    align: "left",
    field: (row) => row.equipo1.nombre,
    format: (val) => `${val}`,
  },
];
</script>
<style>
.rowNumber::before {
  counter-increment: cssRowCounter;
  content: counter(cssRowCounter);
}
</style>
