<template>
  <q-card class="my-card">
    <q-card-section>
      <h2 class="q-mt-xs">Inicio de sesión</h2>

      <q-form @submit="doLogin" class="q-gutter-md">
        <q-input
          type="text"
          label="Usuario"
          v-model="usuario"
          hint="Nombre de usuario"
          required
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Por favor debe ingresar un dato valido',
          ]"
        ></q-input>

        <q-input
          type="password"
          label="Contraseña"
          v-model="contrasenia"
          hint="Contraseña de seguridad"
          required
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Por favor debe ingresar un dato valido',
          ]"
        ></q-input>

        <q-btn type="submit" variant="primary">Enviar</q-btn>
      </q-form>
      <p>
        ¿No esta registrado?
        <q-btn
          flat
          label="Registrese aquí"
          no-caps
          @click="registerActive = !registerActive"
          color="primary"
          padding="xs"
        />
      </p>
    </q-card-section>
  </q-card>
</template>

<script>
import md5 from "js-md5"
export default {
  name: "ComponenteIngresar",
  setup() {
    return {};
  },
  computed: {
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
    usuarioLogeado: {
      get() {
        return this.$store.getters["autenticacion/getUsuarioLogeado"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setUsuarioLogeado", valor);
      },
    },
    logeado: {
      get() {
        return this.$store.getters["autenticacion/getLogeado"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setLogeado", valor);
      },
    },
    usuario: {
      get() {
        return this.$store.getters["autenticacion/getUsuario"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setUsuario", valor);
      },
    },
    contrasenia: {
      get() {
        return this.$store.getters["autenticacion/getContrasenia"];
      },
      set(valor) {
        return this.$store.dispatch("autenticacion/setContrasenia", valor);
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
    async doLogin(){
      this.contrasenia = md5(this.contrasenia);
      console.log(this.contrasenia);
      await this.$store.dispatch("autenticacion/login");
      if(this.logeado){
        //await axios.post()
        this.$router.push({ path: '/'/* + this.usuarioLogeado.user */ });
        this.usuario = "";
        this.contrasenia = "";
      }
    }
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
</style>
