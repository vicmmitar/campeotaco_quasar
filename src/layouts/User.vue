<template>
  <q-layout view="hHr lpr lFr">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/copa_fut.png" alt="icono" />
          </q-avatar>
          <q-btn flat label="Campeotaco" to="/" />
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" bordered>
      <q-scroll-area v-if="logeado" style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item @click="doLogout" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section> Cerrar session </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="../assets/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="60px" class="q-mb-sm">
            <img src="../assets/boy-avatar.png" alt="avatar" />
          </q-avatar>
          <template v-if="logeado">
            <div class="text-weight-bold">
              {{ usuarioLogeado.nombre }} {{ usuarioLogeado.apellido }}
            </div>
            <div>@{{ usuarioLogeado.user }}</div>
          </template>

          <template v-else>
            <div>
              <q-btn
                flat
                color="primary"
                size="sm"
                text-color="white"
                label="Iniciar Sesión"
                to="/login"
                @click="registerActive = false"
              />
              ó
              <q-btn
                flat
                color="primary"
                size="sm"
                text-color="white"
                label="Registrarse"
                to="/login"
                @click="registerActive = true"
              />
            </div>
          </template>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const rightDrawerOpen = ref(true)

    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
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
    registerActive: {
      get() {
        return this.$store.getters["autenticacion/getRegisterActive"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setRegisterActive", valor);
      },
    },
  },
  methods: {
    changeLogeedState: function () {
      this.logeado = !this.logeado;
    },
    async doLogout(){
      console.log('cerrar sesion');
      await this.$store.dispatch("autenticacion/logout");
      this.$router.push({ path: '/' });
    }
  },
}
</script>