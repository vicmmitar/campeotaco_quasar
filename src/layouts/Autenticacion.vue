<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/copa_fut.png" />
          </q-avatar>
          <q-btn flat label="Campeotaco" to="/" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { useQuasar } from "quasar";

export default {
  created() {
    if (this.logeado) {
      const $q = useQuasar();
      $q.notify("Usted ya inicio sesion");
    }
  },
  computed: {
  },
};
</script>
