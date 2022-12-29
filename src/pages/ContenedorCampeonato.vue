<template>
  <div class="q-pa-md">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="equipo" label="Equipo" />
      <q-tab name="fixture" label="Fixture" />
      <q-tab name="planilla" label="Planilla" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="equipo">
        <campeonato
          :titulo1="this.titulo"
          :nombre1="this.nombre"
          :costo_inscripcion1="this.costo_inscripcion"
          :fecha_limite_inscripcion1="this.fecha_limite_inscripcion"
        />
      </q-tab-panel>

      <q-tab-panel name="fixture">
        <fixture />
      </q-tab-panel>

      <q-tab-panel name="planilla">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { ref } from "vue";
import Campeonato from "./Campeonato.vue";
import Fixture from "./Fixture.vue";
export default {
  components: { Campeonato, Fixture },
  props: {
    titulo: String,
    nombre: String,
    costo_inscripcion: String,
    fecha_limite_inscripcion: String,
  },
  setup() {
    return {
      tab: ref("mails"),
    };
  },
};
</script>
