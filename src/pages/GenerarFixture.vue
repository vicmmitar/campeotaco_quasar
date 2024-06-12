<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-markup-table class="col-12">
        <thead>
          <tr>
            <th class="text-center">Fecha</th>
            <!-- <th class="text-center">Hora Inicio</th>
          <th class="text-center">Hora Fin</th> -->
            <th class="text-center">Equipo</th>
            <th class="text-center">VS.</th>
            <th class="text-center">Equipo</th>
          </tr>
        </thead>
        <draggable
          v-model="list"
          :options="{ handle: '.no-draggable' }"
          tag="tbody"
          item-key="idrolencuentro"
          @start="drag = true"
          @end="drag = false"
          :disabled=true
        >
          <template #item="{ element, index }">
            <tr>
              <td class="no-draggable text-center">
                <!-- <span>
                {{
                  new Date(element.fecha).getUTCDate() +
                  "-" +
                  new Date(element.fecha).getUTCMonth() +
                  1 +
                  "-" +
                  new Date(element.fecha).getUTCFullYear()
                }}
              </span> -->
                <span> {{index+1}} </span>
              </td>
              <!-- <td class="no-draggable">
              <span>
                {{
                  new Date(element.hora_inicio).getUTCHours() +
                  ":" +
                  new Date(element.hora_inicio).getUTCMinutes()
                }}
              </span>
            </td>
            <td class="no-draggable">
              <span>
                {{
                  new Date(element.hora_fin).getUTCHours() +
                  ":" +
                  new Date(element.hora_fin).getUTCMinutes()
                }}
              </span>
            </td> -->
              <td class="text-center">
                <span>
                  {{ element.equipo.nombre }}
                </span>
              </td>
              <td class="text-center">
                <span> vs. </span>
              </td>
              <td class="text-center">
                <span>
                  {{ element.equipo1.nombre }}
                </span>
              </td>
            </tr>
          </template>
        </draggable>
      </q-markup-table>
    </div>
    <div class="q-mt-md">LISTA: {{ JSON.stringify(list) }}</div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
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
      drag: false,
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
    list: {
      get() {
        return this.$store.getters["autenticacion/getList"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setList", valor);
      },
    },
  },
  async created() {
    await this.$store.dispatch("autenticacion/actualizarTablaFixture");
  },
};
</script>
