<template>
  <q-page padding>
    <q-markup-table class="col-12">
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">Name</th>
          <th class="text-center">Description</th>
        </tr>
      </thead>
      <draggable v-model="list" tag="tbody">
        <tr v-for="el in list" :key="el.id">
          <td>
            <q-icon name="drag_handle" />
          </td>
          <td>
            <span>
              {{ el.name }}
            </span>
          </td>
          <td>
            <span>
              {{ el.description }}
            </span>
          </td>
        </tr>
      </draggable>
    </q-markup-table>
  </q-page>
</template>

<script>
export default {
  setup() {
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
  },
  async created() {
    let url = this.ip + "rolencuentro/partidos";
    await axios({
      method: "post",
      url: url,
      data: {
        idcampeonato: this.idCampGest,
      }
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
  },
};
</script>
