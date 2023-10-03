<template>
  <div class="q-pa-md q-gutter-y-md column items-center">
    <h4>Gestionar {{ nombre }}</h4>
    <EquiposInscritos :costo_inscripcion="costo_inscripcion" :fecha_limite_inscripcion="fecha_limite_inscripcion" />
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import EquiposInscritos from "src/components/EquiposInscritos.vue";

export default {
  components: { EquiposInscritos },
  props: {
    titulo: String,
    nombre: String,
    costo_inscripcion: String,
    fecha_limite_inscripcion: String,
  },
  setup() {
    return {
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
  }
};
</script>
