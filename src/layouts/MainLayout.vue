<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
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

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      
      <q-scroll-area v-if="logeado" style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>

          <q-item @click="doLogout" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section> Cerrar session </q-item-section>
          </q-item>

          <q-item to="gestioncampeonatos" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section> Gestionar campeonatos </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>

      <router-link :to="usuarioLogeado!=null? usuarioLogeado.user:''">
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
      </router-link>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const rightDrawerOpen = ref(false);

    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      usuario: "Iniciar Sesión",
      alias: "user",
    };
  },
  mounted() {
    console.log("logeado: " + this.logeado);
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
    }
  },
};
</script>
